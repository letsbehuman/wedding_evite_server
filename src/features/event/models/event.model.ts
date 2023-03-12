import mongoose, { model, Model, Schema } from 'mongoose';
import { IEventDocument } from '../interfaces/event.interface';

const eventSchema: Schema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    title: { type: String },
    date: { type: String },
    time: { type: String },
    locationOne: { type: String },
    locationTwo: { type: String },
    locationThree: { type: String },
    contactOne: { type: String },
    contactTwo: { type: String },
    contactThree: { type: String },
    message: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const EventModel: Model<IEventDocument> = model<IEventDocument>('Event', eventSchema, 'Event');
export { EventModel };
