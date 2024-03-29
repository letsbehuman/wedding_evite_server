import { IUserDocument } from '@user/interfaces/user.interface';
import mongoose, { model, Model, Schema } from 'mongoose';

const userSchema: Schema = new Schema({
    authId: { type: mongoose.Schema.Types.ObjectId, ref: 'Auth', index: true },
    date: { type: String, default: '' },
    hasEvent: { type: Boolean, default: false },
    guestCount: { type: Number, default: 0 }
});

const UserModel: Model<IUserDocument> = model<IUserDocument>('User', userSchema, 'User');
export { UserModel };
