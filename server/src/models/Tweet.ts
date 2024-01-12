import mongoose, { Schema, Types, model } from "mongoose";
import { TweetDoc } from "../interfaces/TweetDoc";

const TweetSchema = new Schema<TweetDoc>(
  {
    body: {
      type: String,
      required: true,
      maxlength: 160,
      trim: true,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    likes: {
      type: Types.ObjectId,
      ref: "User",
      default: null,
    },
    retweets: {
      type: Types.ObjectId,
      ref: "User",
      default: null,
    },
    quotes: {
      type: Types.ObjectId,
      ref: "User",
      default: null,
    },
    comments: {
      type: Types.ObjectId,
      ref: "Tweet",
      default: null,
    },
  },
);

export default model<TweetDoc>("Tweet", TweetSchema);
