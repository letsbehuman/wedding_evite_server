import { ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { joiValidation } from '@globals/decorators/joi-validation.decorators';
import { addFamilyGuestSchema } from '@familyGuest/schemas/familyGuest.schema';
import { familyGuestService } from '@service/db/familyGuest.service';
import { IFamilyDocument } from '@familyGuest/interfaces/familyGuest.interface';

export class addFamilyGuest {
    @joiValidation(addFamilyGuestSchema)
    public async family(req: Request, res: Response): Promise<void> {
        const { guests, extraGuestPermission } = req.body;
        const familyObjectId: ObjectId = new ObjectId();
        const familyGuestData: IFamilyDocument = {
            _id: familyObjectId,
            userId: req.currentUser?.userId,
            guests,
            extraGuestPermission,
            isConfirmed: false
        } as IFamilyDocument;
        await familyGuestService.addFamilyToDB(familyGuestData);

        res.status(HTTP_STATUS.CREATED).json({ message: 'Family added to guest list' });
    }
}
