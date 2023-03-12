import {  IEventContent } from './../../event/interfaces/event.interface';
import mongoose, { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IUserDocument extends Document {
    _id: string | ObjectId;
    authId: string | ObjectId;
    username?:string;
    password?:string;
    email?:string;
    uId?:string;
    event:IEventContent
  
}

export interface IResetPasswordParams {
    username: string;
    email: string;
    ipaddress: string;
    date: string;
}




export interface ISearchUser {
    _id: string;
    profilePicture: string;
    username: string;
    email: string;
}



export interface ILogin {
    userId: string;
}

export interface IUserJobInfo {
    key?: string;
    value?: string | 
}

export interface IUserJob {
    keyOne?: string;
    keyTwo?: string;
    key?: string;
    value?: string |  IUserDocument;
}

export interface IEmailJob {
    receiverEmail: string;
    template: string;
    subject: string;
}

export interface IAllUsers {
    users: IUserDocument[];
    totalUsers: number;
}
