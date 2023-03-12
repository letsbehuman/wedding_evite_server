import mongoose, { Document } from 'mongoose';

export interface IEventDocument extends Document {
    _id?: string | mongoose.Types.ObjectId;
    userId: string;
    title?: string;
    nameOne: string;
    nameTwo: string;
    date: string;
    time: string;
    contactOne?: string;
    contactTwo?: string;
    contactThree?: string;
    locationOne: string;
    locationTwo?: string;
    locationThree?: string;
    message?: string;
    createdAt?: Date;
}
//** We are not using this interface at the moment */
export interface IEventContent {
    nameOne: string;
    nameTwo: string;
    contactOne?: IContact | '';
    contactTwo?: IContact | '';
    contactThree?: IContact | '';
    locationOne: ILocation | '';
    locationTwo?: ILocation | '';
    locationThree?: ILocation | '';
    message: string;
}

export interface ILocation {
    id: string;
    title: string;
    name: string;
    image?: string;
    date: string;
    time: string;
    address: string;
}

export interface IContact {
    id: string;
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
