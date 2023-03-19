import { FamilyGuestModel } from '@familyGuest/models/familyGuest.model';
import { IUserDocument } from '@user/interfaces/user.interface';
import { UserModel } from '@user/models/user.model';
import { EventModel } from '@root/features/event/models/event.model';
import { IEventDocument } from '@event/interfaces/event.interface';
import {
    IGuestDocument,
    IQueryComplete,
    IQueryDeleted
} from '@guestList/interfaces/guest.interface';
import { GuestModel } from '@guestList/models/guestList.model';
import mongoose, { Query, UpdateQuery } from 'mongoose';
import { IFamilyDocument } from '@familyGuest/interfaces/familyGuest.interface';

class GuestListService {
    public async addGuestToDB(guestData: IGuestDocument, eventId: string): Promise<void> {
        try {
            const { familyId } = guestData;
            const guest: Promise<IGuestDocument> = GuestModel.create(guestData);
            const familyConfirm: UpdateQuery<IFamilyDocument> = FamilyGuestModel.findOneAndUpdate(
                { _id: familyId },
                { isConfirmed: true },
                { new: true }
            );
            await Promise.all([guest, familyConfirm]);
        } catch (error) {
            console.error('An error occurred while adding guest to DB:', error);

            throw error;
        }
    }
    public async getGuestCount(eventId: string): Promise<number> {
        const count: number = await EventModel.find({ _id: eventId }).countDocuments();
        return count;
    }

    public async updateGuest(guestDataUpdated: IGuestDocument, guestId: string): Promise<void> {
        const guestUpdated: UpdateQuery<IGuestDocument> = GuestModel.updateOne(
            { _id: guestId },
            { $set: guestDataUpdated }
        );
        if (guestDataUpdated.status === true) {
            await EventModel.updateOne(
                { _id: guestDataUpdated.eventId },
                { $inc: { guestCount: 1 } }
            );
        }
        if (guestDataUpdated.status === false) {
            await EventModel.updateOne({ _id: guestId }, { $inc: { guestCount: -1 } });
        }

        await Promise.all([guestUpdated]);
    }

    public async deleteFromDB(guestId: string, userId: string): Promise<void> {
        const deletedGuest: Query<IQueryComplete & IQueryDeleted, IGuestDocument> =
            GuestModel.deleteOne({ _id: guestId });
        const event: UpdateQuery<IEventDocument> = EventModel.updateOne(
            { userId: userId },
            { $inc: { guestCount: -1 } }
        );
        const user: UpdateQuery<IUserDocument> = UserModel.updateOne(
            {
                _id: userId
            },
            { $inc: { guestCount: -1 } }
        );
        await Promise.all([deletedGuest, user, event]);
    }

    public async getGuestList(eventId: string): Promise<IGuestDocument[]> {
        const guests: IGuestDocument[] = await GuestModel.find({ eventId: eventId, status: true });

        return guests;
    }

    public async guestCount(): Promise<number> {
        const count: number = await GuestModel.find({}).countDocuments();
        return count;
    }
}

export const guestListService: GuestListService = new GuestListService();
