import { ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { joiValidation } from '@globals/decorators/joi-validation.decorators';
import { addFamilyGuestSchema } from '@familyGuest/schemas/familyGuest.schema';
import { familyGuestService } from '@service/db/familyGuest.service';
import { IFamilyDocument } from '@familyGuest/interfaces/familyGuest.interface';
import { IGuestDocument } from '@guestList/interfaces/guest.interface';

export class addFamilyGuest {
    @joiValidation(addFamilyGuestSchema)
    public async family(req: Request, res: Response): Promise<void> {
        const { guests, extraGuestPermission } = req.body;
        const familyObjectId: ObjectId = new ObjectId();
        const { eventId } = req.params;
        const familyGuestData: IFamilyDocument = {
            _id: familyObjectId,
            eventId,
            guests,
            extraGuestPermission,
            isConfirmed: false
        } as IFamilyDocument;

        //create a guestList collection
        //add the guest of the family

        await familyGuestService.addFamilyToDB(familyGuestData);

        res.status(HTTP_STATUS.CREATED).json({ message: 'Family added to guest list' });
    }
}
