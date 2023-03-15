import { FamilyGuestModel } from '@familyGuest/models/familyGuest.model';
import { IUserDocument } from '@user/interfaces/user.interface';
import { UserModel } from '@user/models/user.model';
import { EventModel } from '@root/features/event/models/event.model';
import { IEventDocument } from '@event/interfaces/event.interface';
import {
    IGuestDocument,
    IQueryComplete,
    IQueryDeleted,
    IQueryGuest
} from '@guestList/interfaces/guest.interface';
import { GuestModel } from '@guestList/models/guestList.model';
import mongoose, { Query, UpdateQuery } from 'mongoose';
import { IFamilyDocument } from '@familyGuest/interfaces/familyGuest.interface';

class GuestListService {
    public async addGuestToDB(guestData: IGuestDocument, eventId: string): Promise<void> {
        try {
            const { familyId } = guestData;
            const guest: Promise<IGuestDocument> = GuestModel.create(guestData);
            const familyConfirm: UpdateQuery<IFamilyDocument> = FamilyGuestModel.updateOne(
                { _id: familyId },
                { isConfirmed: true },
                { new: true }
            );
            const event: UpdateQuery<IEventDocument> = EventModel.updateOne(
                { _id: eventId },
                { $inc: { guestCount: 1 } }
            );
            await Promise.all([guest, familyConfirm, event]);
        } catch (error) {
            console.error('An error occurred while adding guest to DB:', error);

            throw error;
        }
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

    public async getGuestList(query: IQueryGuest): Promise<IGuestDocument[]> {
        const guests: IGuestDocument[] = await GuestModel.aggregate([{ $match: query }]);
        return guests;
    }

    public async guestCount(): Promise<number> {
        const count: number = await GuestModel.find({}).countDocuments();
        return count;
    }
}

export const guestListService: GuestListService = new GuestListService();
