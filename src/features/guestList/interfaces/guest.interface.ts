import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

export interface IGuestDocument extends Document {
    _id?: string | ObjectId;
    eventId: string;
    familyId: string | ObjectId;
    name: string;
    surname?: string;
    menu: string;
    status: boolean;
}

export interface IQueryComplete {
    ok?: number;
    n?: number;
}
export interface IQueryDeleted {
    deletedCount?: number;
}
export interface IQueryGuestList {
    _id?: string | ObjectId;
    eventId?: string | ObjectId;
}
