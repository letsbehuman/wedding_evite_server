import mongoose, { model, Model, Schema } from 'mongoose';
import { IFamilyDocument } from '../interfaces/familyGuest.interface';

const familyGuestSchema: Schema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    guests: { type: Object },
    extraGuestPermission: { type: Boolean },
    isConfirmed: { type: Boolean, default: false }
});

const FamilyGuestModel: Model<IFamilyDocument> = model<IFamilyDocument>(
    'FamilyGuest',
    familyGuestSchema,
    'FamilyGuest'
);
export { FamilyGuestModel };
