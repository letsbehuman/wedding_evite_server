import { IFamilyDocument } from '@familyGuest/interfaces/familyGuest.interface';
import { joiValidation } from '@globals/decorators/joi-validation.decorators';
import { BadRequestError } from '@globals/helpers/error-handler';
import { IGuestDocument } from '@guestList/interfaces/guest.interface';
import { confimationGuest } from '@guestList/schemas/guestList.schema';
import { familyGuestService } from '@service/db/familyGuest.service';
import { guestListService } from '@service/db/guestList.service';
import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

export class UpdateGuest {
    @joiValidation(confimationGuest)
    public async guest(req: Request, res: Response): Promise<void> {
        const { guests } = req.body;
        const { familyId, eventId } = req.params;
        const checkIsConfirm: IFamilyDocument = await familyGuestService.getFamilyById(familyId);
        if (checkIsConfirm.isConfirmed) {
            throw new BadRequestError(
                'You have already confirm, get in contact to modify a request'
            );
        }
        let guestsConfirmation = [];
        for (let guest of guests) {
            const guestDataUpdated: IGuestDocument = {
                _id: guest._id,
                eventId: eventId,
                familyId: familyId,
                name: guest.name,
                surname: guest.suername,
                menu: guest.menu,
                status: guest.status
            } as IGuestDocument;
            if (guest.status === true) {
                guestsConfirmation.push(guest.name);
            }
            await guestListService.updateGuest(guestDataUpdated, guest._id);
        }
        res.status(HTTP_STATUS.OK).json({
            message: `${guestsConfirmation} is comming to the event`
        });
    }
}
