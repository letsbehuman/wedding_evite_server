import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

export interface IFamilyDocument extends Document {
    _id?: string | ObjectId;
    userId: string | ObjectId;
    guests: object[];
    extraGuestPermission: boolean;
    isConfirmed: boolean;
}
