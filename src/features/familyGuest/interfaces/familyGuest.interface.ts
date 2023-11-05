import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

export interface IFamilyDocument extends Document {
    _id?: string | ObjectId;
    eventId: string | ObjectId;
    guests: IGuestDocument[];
    extraGuestPermission: boolean;
    isConfirmed: boolean;
}

export interface IGuestDocument {
    _id?: string | ObjectId;
    familyId: string | ObjectId;
    firstName: string;
    surname: string;
    email?: string;
    isConfirmed: boolean;
    menu: string[];

}