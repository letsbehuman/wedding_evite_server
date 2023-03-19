import { ObjectId } from 'mongodb';
import { familyGuestService } from '@service/db/familyGuest.service';
import { IGuestDocument } from '@guestList/interfaces/guest.interface';
import { guestListService } from '@service/db/guestList.service';
import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import mongoose from 'mongoose';
import { omit } from 'lodash';

export class GetGuests {
    public async all(req: Request, res: Response): Promise<void> {
        let guestCount = 0;
        const { eventId } = req.params;
        let guestList: IGuestDocument[] = await guestListService.getGuestList(eventId);
        guestCount = await guestListService.guestCount();

        res.status(HTTP_STATUS.OK).json({ message: 'Guest list', guestCount, guestList });
    }
}
