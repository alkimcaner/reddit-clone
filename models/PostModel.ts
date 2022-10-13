import { Schema, model, models } from "mongoose";

const commentSchema = new Schema(
  {
    uid: { type: String, required: true },
    username: { type: String, required: true },
    userImage: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const postSchema = new Schema(
  {
    uid: { type: String, required: true },
    username: { type: String, required: true },
    userImage: { type: String, required: true },
    community: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    comments: [commentSchema],
    votes: { type: [{ uid: String, vote: Boolean }], required: true },
    saved: { type: [String], required: true },
  },
  { timestamps: true }
);

export const Post = models.Post || model("Post", postSchema);
