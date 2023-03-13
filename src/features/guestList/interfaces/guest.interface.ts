import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

export interface IGuestDocument extends Document {
    _id?: string | ObjectId;
    userId: string;
    name: string;
    surname?: string;
    extraGuestPermission: boolean;
    menu: string;
}

export interface IExtraGuestDocument extends Document {
    _id?: string | ObjectId;
    userId: string;
    familyId: string;
    name: string;
    surname: string;
}
export interface IQueryComplete {
    ok?: number;
    n?: number;
}
export interface IQueryDeleted {
    deletedCount?: number;
}
export interface IQueryGuest {
    _id?: string | ObjectId;
    guestId?: string | ObjectId;
}
