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
import { AuthModel } from '@auth/models/auth.model';

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
    //!aun no funciona esta
    // public async getEventByUserId(userId: string): Promise<IEventDocument> {
    //     const event: IEventDocument = (await EventModel.findOne({
    //         userId: userId
    //     }).exec()) as IEventDocument;
    //     return event;
    // }

    public async getEventByUserId(userId: string): Promise<IEventDocument[]> {
        const events: IEventDocument[] = await EventModel.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } } //here userId has to be a mongodb object id
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

    private aggregateProject() {
        // for $project operator
        // 1= include
        // 0 = exclude
        return {
            _id: 1,
            title: 1,
            nameOne: 1,
            nameTwo: 1
        };
    }
}

export const eventService: EventService = new EventService();
