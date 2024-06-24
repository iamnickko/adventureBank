import { Schema, model, Types } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      required: true,
    },
    gear: [
      {
        type: Types.ObjectId,
        ref: "Gear",
      },
    ],
    adventures: [
      {
        type: Types.ObjectId,
        ref: "Adventure",
      },
    ],
  },
  { timestamps: true }
);
const User = model("User", userSchema);

export default User;
