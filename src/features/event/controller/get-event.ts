import { IContact } from '@event/interfaces/event.interface';
import { IEventDocument } from '@event/interfaces/event.interface';
import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { eventService } from '@service/db/event.service';
import { guestListService } from '@service/db/guestList.service';

export class GetEvent {
    public async event(req: Request, res: Response): Promise<void> {
        const { eventId } = req.params;

        const guestCount: number = await guestListService.getGuestCount(eventId);
        const event: IEventDocument = await eventService.getEvent(eventId);
        res.status(HTTP_STATUS.OK).json({ event, guestCount });
    }
}
