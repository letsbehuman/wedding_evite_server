import { IFamilyDocument } from '@familyGuest/interfaces/familyGuest.interface';
import { UserModel } from '@user/models/user.model';
import { EventModel } from '@root/features/event/models/event.model';

import mongoose, { Query, UpdateQuery } from 'mongoose';
import { IUserDocument } from '@user/interfaces/user.interface';
import { IEventDocument } from '@event/interfaces/event.interface';
import { FamilyGuestModel } from '@familyGuest/models/familyGuest.model';

class FamilyGuestService {
    public async addFamilyToDB(familyData: IFamilyDocument): Promise<void> {
        const { userId } = familyData;
        const family: Promise<IFamilyDocument> = FamilyGuestModel.create(familyData);
        const user: UpdateQuery<IUserDocument> = UserModel.updateOne(
            { _id: userId },
            { $inc: { guestCount: 1 } }
        );
        const event: UpdateQuery<IEventDocument> = EventModel.updateOne(
            { userId: userId },
            { $inc: { guestCount: 1 } }
        );
        await Promise.all([family, user, event]);
    }
}

export const familyGuestService: FamilyGuestService = new FamilyGuestService();
