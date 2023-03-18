import mongoose, { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IEventDocument extends Document {
    _id?: string | mongoose.Types.ObjectId;
    userId: string;
    title?: string;
    nameOne: string;
    nameTwo: string;
    date: string;
    time: string;
    contactOne?: IContact;
    contactTwo?: IContact;
    contactThree?: IContact;
    locationOne: ILocation;
    locationTwo?: ILocation;
    locationThree?: ILocation;
    message?: string;
    createdAt?: Date;
    guestCount: number;
}

export interface ILocation {
    id?: string;
    title: string;
    name?: string;
    image?: string;
    date: string;
    time: string;
    address: string;
}

export interface IContact {
    id?: string;
    title?: string;
    name: string;
    phone: string;
    inChargeOf?: string;
}
export interface IQueryComplete {
    ok?: number;
    n?: number;
}

export interface IQueryDeleted {
    deletedCount?: number;
}

export interface IQueryEvent {
    _id?: string | ObjectId;
    eventId?: string | ObjectId;
}
