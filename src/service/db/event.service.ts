import { UserModel } from '@user/models/user.model';
import {
    IContact,
    IEventDocument,
    IQueryComplete,
    IQueryDeleted
} from '@event/interfaces/event.interface';
import { EventModel } from '@event/models/event.model';
import { IUserDocument } from '@user/interfaces/user.interface';
import mongoose, { Query, UpdateQuery } from 'mongoose';

class EventService {
    public async addEventToDB(createdEvent: IEventDocument): Promise<void> {
        const { date, userId } = createdEvent;
        const event: Promise<IEventDocument> = EventModel.create(createdEvent);
        const user: UpdateQuery<IUserDocument> = UserModel.updateOne(
            { _id: userId },
            { date: date, hasEvent: true }
        );

        await Promise.all([event, user]);
    }

    public async getEvent(eventId: string): Promise<IEventDocument> {
        const event: IEventDocument = (await EventModel.findOne({
            _id: eventId
        }).exec()) as IEventDocument;
        return event;
    }

    public async getEventByUserId(userId: string): Promise<IEventDocument[]> {
        const events: IEventDocument[] = await EventModel.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(userId) } } //here userId has to be a mongodb object id
        ]);
        return events;
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
