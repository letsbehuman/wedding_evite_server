import { IFamilyDocument } from '@familyGuest/interfaces/familyGuest.interface';
import { UserModel } from '@user/models/user.model';
import { EventModel } from '@root/features/event/models/event.model';

import mongoose, { Query, UpdateQuery } from 'mongoose';
import { IUserDocument } from '@user/interfaces/user.interface';
import { IEventDocument } from '@event/interfaces/event.interface';
import { FamilyGuestModel } from '@familyGuest/models/familyGuest.model';

class FamilyGuestService {
    public async addFamilyToDB(familyData: IFamilyDocument): Promise<void> {
        const { eventId } = familyData;
        const family: Promise<IFamilyDocument> = FamilyGuestModel.create(familyData);

        const event: UpdateQuery<IEventDocument> = EventModel.updateOne(
            { _id: eventId },
            { $inc: { guestCount: 1 } }
        );
        await Promise.all([family, event]);
    }

    public async getFamilyById(familyId: string): Promise<IFamilyDocument> {
        const family: IFamilyDocument = (await FamilyGuestModel.findOne({
            _id: familyId
        }).exec()) as IFamilyDocument;
        return family;
    }
}

export const familyGuestService: FamilyGuestService = new FamilyGuestService();
