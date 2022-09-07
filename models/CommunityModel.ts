import { Schema, model, models } from "mongoose";

const communitySchema = new Schema(
  {
    name: { type: String, required: true },
    about: { type: String, required: true },
    admin: { type: String, required: true },
  },
  { timestamps: true }
);

export const Community =
  models.Community || model("Community", communitySchema);
