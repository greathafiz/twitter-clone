import { Document, Types } from "mongoose";
import { UserDoc } from "./UserDoc";

export interface TweetDoc extends Document {
  _id: Types.ObjectId;
  body: string;
  user: Types.ObjectId | UserDoc;
  createdAt: Date;
  likes?: Types.ObjectId[] | null;
  retweets?: Types.ObjectId[] | null;
  quotes?: Types.ObjectId[] | null;
  comments?: Types.ObjectId[] | null;
}
