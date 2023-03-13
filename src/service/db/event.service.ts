import { Helpers } from './../../globals/helpers/helpers';
import { AuthModel } from '@auth/models/auth.model';
import { IAuthDocument } from './../../features/auth/interfaces/auth.interface';
import {
    IEventDocument,
    IQueryComplete,
    IQueryDeleted
} from '@root/features/event/interfaces/event.interface';
import { EventModel } from '@root/features/event/models/event.model';
import { UserModel } from '@user/models/user.model';
import mongoose, { Query, UpdateQuery } from 'mongoose';

class EventService {
    public async addEventToDB(createdEvent: IEventDocument): Promise<void> {
        await EventModel.create(createdEvent);
    }

    public async getEvent(userId: string): Promise<IEventDocument> {
        const event: IEventDocument = (await EventModel.findOne({
            userId: userId
        }).exec()) as IEventDocument;
        return event;
    }

    public async getEventByUsername(userId: string): Promise<IEventDocument[]> {
        const events: IEventDocument[] = await EventModel.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(userId) } } //here userId has to be a mongodb object id
        ]);
        return events;
    }

    public async getEventById(userId: string): Promise<IEventDocument> {
        const events: IEventDocument[] = await UserModel.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(userId) } },
            { $lookup: { from: 'User', localField: 'userId', foreignField: '_id', as: 'userId' } },
            { $unwind: '$userId' }, //transform an array to an object
            { $project: this.aggregateProject() }
        ]);
        return events[0];
    }
    private aggregateProject() {
        return {
            _id: 1,

            title: 1,
            nameOne: 1,
            nameTwo: 1,
            date: 1,
            time: 1,
            contactOne: 1,
            contactTwo: 1,
            contactThree: 1,
            contactFour: 1,
            locationOne: 1,
            locationTwo: 1,
            locationThree: 1,
            message: 1,
            createdAt: '$eventId.createdAt'
        };
    }
    public async deleteEvent(eventId: string): Promise<void> {
        const deleteEvent: Query<IQueryComplete & IQueryDeleted, IEventDocument> =
            EventModel.deleteOne({ _id: eventId });
        await Promise.all([deleteEvent]);
    }

    public async editEvent(eventId: string, updatedEvent: IEventDocument): Promise<void> {
        const updateEvent: UpdateQuery<IEventDocument> = EventModel.updateOne(
            { _id: eventId },
            { $set: updatedEvent }
        );
        await Promise.all([updateEvent]);
    }
}

export const eventService: EventService = new EventService();
