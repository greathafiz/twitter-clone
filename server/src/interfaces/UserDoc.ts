import { JwtPayload } from "jsonwebtoken";
import { Document, ObjectId } from "mongoose";

export interface UserDoc extends Document {
  _id: ObjectId;
  userId?: string | JwtPayload
  name?: string;
  username?: string;
  googleId?: string;
  email: string;
  birthDate?: Date;
  password: string;
  avatar?: string;
  coverImage?: string;
  bio?: string;
  location?: string;
  website?: string;
  createdAt?: Date;
  updatedAt?: Date;
  tweets?: ObjectId[];
  likedTweets?: ObjectId[];
  quotes?: ObjectId[] | null;
  comments?: ObjectId[];
  followers?: ObjectId[];
  following?: ObjectId[];
}
