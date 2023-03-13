import { IEventDocument } from '@event/interfaces/event.interface';
import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { eventService } from '@service/db/event.service';

export class GetEvent {
    public async event(req: Request, res: Response): Promise<void> {
        const { userId } = req.params;
        const event: IEventDocument = await eventService.getEvent(userId);
        res.status(HTTP_STATUS.OK).json({ event });
    }
}
