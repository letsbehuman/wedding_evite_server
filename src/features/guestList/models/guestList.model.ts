import { IGuestDocument } from '@guestList/interfaces/guest.interface';
import mongoose, { model, Model, Schema } from 'mongoose';

const guestSchema: Schema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', index: false },
    familyId: { type: String },
    eventId: { type: String },
    name: { type: String },
    surname: { type: String },
    menu: { type: String },
    status: { type: Boolean, default: false }
});

const GuestModel: Model<IGuestDocument> = model<IGuestDocument>(
    'GuestList',
    guestSchema,
    'GuestList'
);

export { GuestModel };
