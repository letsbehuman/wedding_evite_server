import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import HTTP_STATUS from 'http-status-codes';
import { eventSchema } from '../schemas/event.schema';
import { IEventDocument } from '../interfaces/event.interface';
import { joiValidation } from '@globals/decorators/joi-validation.decorators';
import { eventService } from '@service/db/event.service';

export class Create {
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
        const eventObjectId: ObjectId = new ObjectId();
        const createdEvent: IEventDocument = {
            _id: eventObjectId,
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

            message,
            createdAt: new Date()
        } as IEventDocument;

        await eventService.addEventToDB(createdEvent);

        res.status(HTTP_STATUS.CREATED).json({ message: 'Event created successfully' });
    }
}
