import { Document  } from 'mongoose';

export interface User extends Document{
    readonly firstname: string;
    readonly lastname: string;
    readonly email: string;
    readonly birthdate: String;
    readonly createdAt: Date;
}