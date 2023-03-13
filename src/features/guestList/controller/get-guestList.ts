import { IGuestDocument } from '@guestList/interfaces/guest.interface';
import { guestListService } from '@service/db/guestList.service';
import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

export class GetGuests {
    public async guests(req: Request, res: Response): Promise<void> {
        let guestList: IGuestDocument[] = [];
        let guestCount = 0;
        guestList = await guestListService.getGuestList({});
        guestCount = await guestListService.guestCount();

        res.status(HTTP_STATUS.OK).json({ message: 'Guest list', guestCount, guestList });
    }
}
