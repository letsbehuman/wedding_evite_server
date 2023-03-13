import HTTP_STATUS from 'http-status-codes';
import { eventService } from '@service/db/event.service';
import { Request, Response } from 'express';

export class Delete {
    public async event(req: Request, res: Response): Promise<void> {
        await eventService.deleteEvent(req.params.eventId);
        res.status(HTTP_STATUS.OK).json({ message: 'Event deleted successfully' });
    }
}
