import mongoose, { model, Model, Schema } from 'mongoose';
import { IEventDocument } from '@event/interfaces/event.interface';

const eventSchema: Schema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    title: { type: String },
    nameOne: { type: String },
    nameTwo: { type: String },
    date: { type: String },
    time: { type: String },
    contact: { type: Array },
    locations: { type: Array },
    message: { type: String },
    image: { type: String },
    menus: { type: Array },
    gifts: { type: Array },
    dressCode: { type: String },
    childPolicy: { type: Boolean },
    createdAt: { type: Date, default: Date.now },
    guestCount: { type: Number, default: 0 }
});

const EventModel: Model<IEventDocument> = model<IEventDocument>('Event', eventSchema, 'Event');
export { EventModel };
