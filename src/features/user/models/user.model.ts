import { IUserDocument } from '@user/interfaces/user.interface';
import mongoose, { model, Model, Schema } from 'mongoose';

const userSchema: Schema = new Schema({
    authId: { type: mongoose.Schema.Types.ObjectId, ref: 'Auth', index: true },
    event: {
        title: { type: String, default: '' },
        nameOne: { type: String, default: '' },
        nameTwo: { type: String, default: '' },
        date: { type: String, default: '' },
        time: { type: String, default: '' },
        contactOne: { type: String, default: '' },
        contactTwo: { type: String, default: '' },
        contactThree: { type: String, default: '' },
        locationOne: { type: String, default: '' },
        locationTwo: { type: String, default: '' },
        locationThree: { type: String, default: '' },
        message: { type: String }
    }
});

const UserModel: Model<IUserDocument> = model<IUserDocument>('User', userSchema, 'User');
export { UserModel };
