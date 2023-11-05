import { IFamilyDocument } from '@familyGuest/interfaces/familyGuest.interface';
import { ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { joiValidation } from '@globals/decorators/joi-validation.decorators';
import { IGuestDocument } from '@guestList/interfaces/guest.interface';
import { confimationGuest } from '@guestList/schemas/guestList.schema';
import { guestListService } from '@service/db/guestList.service';
import { familyGuestService } from '@service/db/familyGuest.service';
import { BadRequestError } from '@globals/helpers/error-handler';

export class AddGuest {
    @joiValidation(confimationGuest)
    public async guest(req: Request, res: Response): Promise<void> {
        const { guests } = req.body;
        const { familyId, eventId } = req.params;

        let guestsConfirmation = [];

        for (let guest of guests) {
            const guestObjectId: ObjectId = new ObjectId();
            const guestData: IGuestDocument = {
                _id: guestObjectId,
                eventId: eventId,
                familyId: familyId,
                name: guest.name,
                surname: guest.surname,
                menu: guest.menu,
                status: guest.status
            } as IGuestDocument;
            if (guest.status === true) {
                guestsConfirmation.push(guest.name);
            }
            await guestListService.addGuestToDB(guestData, eventId);
        }
        res.status(HTTP_STATUS.OK).json({
            message: `${guestsConfirmation} is comming to the event`
        });
    }
}
