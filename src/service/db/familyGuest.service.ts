import { IFamilyDocument } from '@familyGuest/interfaces/familyGuest.interface';
import { EventModel } from '@root/features/event/models/event.model';
import mongoose, { Query, UpdateWriteOpResult } from 'mongoose';
import { IEventDocument } from '@event/interfaces/event.interface';
import { FamilyGuestModel } from '@familyGuest/models/familyGuest.model';
import { groupBy } from 'lodash';

class FamilyGuestService {
    public async addFamiliesToDB(familyData: IFamilyDocument[]): Promise<void> {
        try {
            await FamilyGuestModel.insertMany(familyData);

            const groupedFamilyData = groupBy(familyData, 'eventId');
            const events: Promise<UpdateWriteOpResult>[] = Object.entries(groupedFamilyData).map(
                ([eventId, families]) =>
                    EventModel.updateOne(
                        { _id: eventId },
                        { $inc: { guestCount: families.length } }
                    )
            );
            await Promise.all(events);
        } catch (error) {
            console.error(`Error occurred while adding families to DB: ${error}`);
            throw error;
        }
    }

    public async getFamilyById(familyId: string): Promise<IFamilyDocument> {
        try {
            const family: IFamilyDocument = (await FamilyGuestModel.findOne({
                _id: familyId
            }).exec()) as IFamilyDocument;
            return family;
        } catch (error) {
            console.error(`Error occurred while getting family by ID: ${error}`);
            throw error;
        }
    }
}

export const familyGuestService: FamilyGuestService = new FamilyGuestService();
