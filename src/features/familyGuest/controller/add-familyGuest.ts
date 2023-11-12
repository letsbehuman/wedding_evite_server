import { ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { joiArrayValidation } from '@globals/decorators/joi-validation.decorators';
import { addFamilyGuestSchema } from '@familyGuest/schemas/familyGuest.schema';
import { familyGuestService } from '@service/db/familyGuest.service';
import { IFamilyDocument } from '@familyGuest/interfaces/familyGuest.interface';
import { IGuestDocument } from '@familyGuest/interfaces/familyGuest.interface';

export class addFamilyGuests {
    @joiArrayValidation(addFamilyGuestSchema)
    public async families(req: Request, res: Response): Promise<void> {
        const families = req.body;
        const { eventId } = req.params;

        console.log(11.1, JSON.stringify(req.body, null, 2));
        if (!Array.isArray(families)) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Families must be an array' });
            return;
        }
        const familyGuestData: IFamilyDocument[] = families.map(
            (family: { guests: IGuestDocument[]; extraGuestPermission: boolean }) => {
                const familyObjectId: ObjectId = new ObjectId();
                return {
                    _id: familyObjectId,
                    eventId,
                    guests: family.guests,
                    extraGuestPermission: family.extraGuestPermission,
                    isConfirmed: false
                } as IFamilyDocument;
            }
        );
        //create a guestList collection
        //add the guest of the family

        await familyGuestService.addFamiliesToDB(familyGuestData);

        res.status(HTTP_STATUS.CREATED).json({ message: 'Family added to guest list' });
    }
}
