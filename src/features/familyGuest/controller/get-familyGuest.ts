import { guestListService } from '@service/db/guestList.service';
import { familyGuestService } from '@service/db/familyGuest.service';
import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

export class GetFamilyGuests {
    public async familyInvite(req: Request, res: Response): Promise<void> {
        const { familyId } = req.params;
        console.log(13.1, { familyId });
        const family = await familyGuestService.getFamilyById(familyId);
        res.status(HTTP_STATUS.OK).json({ family });
    }

    public async allFamilies(req: Request, res: Response): Promise<void> {
        const { eventId } = req.params;
        const allFamilies = await guestListService.getGuestList(eventId);
        res.status(HTTP_STATUS.OK).json({ allFamilies });
    }
}
