import { Schema, model, Types } from "mongoose";
import { UserDoc } from "../interfaces/UserDoc";
import bcrypt from "bcryptjs";

const UserSchema = new Schema<UserDoc>(
  {
    name: String,
    username: String,
    googleId: String,
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value: string): boolean {
          return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
        },
        message: (props: any) => `${props.value} is not a valid email address!`,
      },
    },
    birthDate: Date,
    password: String,
    avatar: String,
    coverImage: String,
    bio: String,
    location: String,
    website: String,
    tweets: [
      {
        type: Types.ObjectId,
        ref: "Tweet",
      },
    ],
    likedTweets: [
      {
        type: Types.ObjectId,
        ref: "Tweet",
      },
    ],
    quotes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tweet",
        default: null,
        trim: true,
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

UserSchema.pre<UserDoc>("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const saltRounds = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, saltRounds);
      next();
    }
  } catch (error) {
    console.error(error);
  }
});

export default model<UserDoc>("User", UserSchema);
