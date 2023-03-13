import { IEventDocument } from '@event/interfaces/event.interface';
import { joiValidation } from '@globals/decorators/joi-validation.decorators';
import { eventSchema } from '@event/schemas/event.schema';
import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { eventService } from '@service/db/event.service';

export class Update {
    @joiValidation(eventSchema)
    public async event(req: Request, res: Response): Promise<void> {
        const {
            title,
            nameOne,
            nameTwo,
            date,
            time,
            locationOne,
            locationTwo,
            locationThree,
            contactOne,
            contactTwo,
            contactThree,
            message
        } = req.body;
        const { eventId } = req.params;
        const updatedEvent: IEventDocument = {
            title,
            nameOne,
            nameTwo,
            date,
            time,
            locationOne,
            locationTwo,
            locationThree,
            contactOne,
            contactTwo,
            contactThree,
            message
        } as IEventDocument;

        await eventService.editEvent(eventId, updatedEvent);

        res.status(HTTP_STATUS.OK).json({ message: 'Event updated successfully', updatedEvent });
    }
}
