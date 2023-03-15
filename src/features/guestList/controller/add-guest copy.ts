import { ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { joiValidation } from '@globals/decorators/joi-validation.decorators';
import { IExtraGuestDocument, IGuestDocument } from '@guestList/interfaces/guest.interface';
import { extraGuestSchema, guestSchema } from '@guestList/schemas/guestList.schema';
import { guestListService } from '@service/db/guestList.service';

export class AddGuest {
    @joiValidation(guestSchema)
    public async guest(req: Request, res: Response): Promise<void> {
        const { name, surname, extraGuestPermission } = req.body;
        const guestObjectId: ObjectId = new ObjectId();
        const guestData: IGuestDocument = {
            _id: guestObjectId,
            familyId: guestObjectId,
            userId: req.currentUser!.userId,
            name,
            surname,
            extraGuestPermission,
            menu: '',
            status: false
        } as IGuestDocument;

        await guestListService.addGuestToDB(guestData);
        res.status(HTTP_STATUS.CREATED).json({ message: 'Guest created and added to guest list' });
    }

    @joiValidation(extraGuestSchema)
    public async extraGuest(req: Request, res: Response): Promise<void> {
        const { name, surname, menu } = req.body;
        const { familyId, userId } = req.params;
        const guestObjectId: ObjectId = new ObjectId();
        const guestData: IExtraGuestDocument = {
            _id: guestObjectId,
            userId,
            familyId,
            name,
            surname,
            menu,
            status: true
        } as IExtraGuestDocument;

        await guestListService.addGuestToDB(guestData);
        res.status(HTTP_STATUS.CREATED).json({
            message: 'Extra guest created and added to guest list'
        });
    }
}
