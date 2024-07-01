import { Schema, model, Types } from "mongoose";

const gearSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Tents",
        "Backpacks",
        "Kitchen",
        "Sleep System",
        "Clothing",
        "Organiser",
        "Navigation",
        "Safety",
        "Other",
      ],
      required: true,
    },
    weight: { type: Number },
    description: { type: String },
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Gear = model("Gear", gearSchema);

export default Gear;
