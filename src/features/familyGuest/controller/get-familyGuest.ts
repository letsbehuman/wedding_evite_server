import { familyGuestService } from '@service/db/familyGuest.service';
import { IGuestDocument } from '@guestList/interfaces/guest.interface';
import { guestListService } from '@service/db/guestList.service';
import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

export class GetFamilyGuests {
    public async familyInvite(req: Request, res: Response): Promise<void> {
        const { eventId, familyId } = req.params;
        const family = await familyGuestService.getFamilyById(familyId);
        res.status(HTTP_STATUS.OK).json({ family });
    }
}
