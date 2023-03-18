import { BadRequestError } from '@globals/helpers/error-handler';
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import HTTP_STATUS from 'http-status-codes';
import { eventSchema } from '@event/schemas/event.schema';
import { IEventDocument } from '@event/interfaces/event.interface';
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

        if (req.currentUser!.hasEvent === true) {
            throw new BadRequestError('There is already an event for this user');
        }
        const createdEvent: IEventDocument = {
            _id: eventObjectId,
            userId: req.currentUser!.userId,
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
            createdAt: new Date(),
            guestCount: 0
        } as IEventDocument;

        await eventService.addEventToDB(createdEvent);

        res.status(HTTP_STATUS.CREATED).json({ message: 'Event created successfully' });
    }
}
