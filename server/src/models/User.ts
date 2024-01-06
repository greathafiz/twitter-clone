import { Schema, model } from "mongoose";
import { UserDoc } from "../interfaces/UserDoc";

const UserSchema = new Schema<UserDoc>({
  displayName: {
    type: String,
  },
  googleId: {
    type: String,
  },
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
  birthDate: {
    type: Date,
    required: true,
  },
  password: {
    type: String,
  },
});

export default model<UserDoc>("User", UserSchema);
