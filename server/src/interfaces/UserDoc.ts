import { Document } from "mongoose";

export interface UserDoc extends Document {
    displayName?: string,
    googleId?: string,
    email: string,
    birthDate: Date,
    password?: string
}