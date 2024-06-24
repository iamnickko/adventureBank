import { Schema, model, Types } from "mongoose";

const adventureSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    gearItems: [
      {
        type: Types.ObjectId,
        ref: "Gear",
      },
    ],
  },
  { timestamps: true }
);

const Adventure = model("Adventure", adventureSchema);

export default Adventure;
