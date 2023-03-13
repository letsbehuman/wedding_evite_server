import { ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { joiValidation } from '@globals/decorators/joi-validation.decorators';
import { IGuestDocument } from '@guestList/interfaces/guest.interface';
import { guestSchema } from '@guestList/schemas/guestList.schema';
import { guestListService } from '@service/db/guestList.service';

export class AddGuest {
    @joiValidation(guestSchema)
    public async guest(req: Request, res: Response): Promise<void> {
        const { name, surname, extraGuestPermission } = req.body;
        const guestObjectId: ObjectId = new ObjectId();
        const guestData: IGuestDocument = {
            _id: guestObjectId,
            userId: req.currentUser!.userId,
            name,
            surname,
            extraGuestPermission,
            menu: ''
        } as IGuestDocument;

        await guestListService.addGuestToDB(guestData);
        res.status(HTTP_STATUS.CREATED).json({ message: 'Guest created and added to guest list' });
    }
}
