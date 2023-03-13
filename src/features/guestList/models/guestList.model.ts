import { IGuestDocument } from '@guestList/interfaces/guest.interface';
import mongoose, { model, Model, Schema } from 'mongoose';

const guestSchema: Schema = new Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', index: false },
    userId: { type: String },
    name: { type: String },
    surname: { type: String },
    extraGuestPermission: { type: Boolean, default: false },
    menu: { type: String }
});
const extraGuestSchema: Schema = new Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', index: false },
    userId: { type: String },
    familyId: { type: String },
    name: { type: String },
    surname: { type: String },
    extraGuestPermission: { type: Boolean, default: false }
});

const GuestModel: Model<IGuestDocument> = model<IGuestDocument>(
    'GuestList',
    guestSchema,
    'GuestList'
);
export { GuestModel };
