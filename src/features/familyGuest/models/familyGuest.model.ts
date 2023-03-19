import mongoose, { model, Model, Schema } from 'mongoose';
import { IFamilyDocument } from '../interfaces/familyGuest.interface';

const familyGuestSchema: Schema = new Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', index: true },
    guests: { type: Object },
    extraGuestPermission: { type: Boolean },
    isConfirmed: { type: Boolean }
});

const FamilyGuestModel: Model<IFamilyDocument> = model<IFamilyDocument>(
    'FamilyGuest',
    familyGuestSchema,
    'FamilyGuest'
);
export { FamilyGuestModel };
