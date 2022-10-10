import { Schema, model, models } from "mongoose";

const communitySchema = new Schema(
  {
    uid: { type: String, required: true },
    name: { type: String, required: true },
    about: { type: String, required: true },
    owner: { type: String, required: true },
  },
  { timestamps: true }
);

export const Community =
  models.Community || model("Community", communitySchema);
