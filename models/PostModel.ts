import { Schema, model, models } from "mongoose";

const commentSchema = new Schema(
  {
    username: { type: String, required: true },
    userImage: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const postSchema = new Schema(
  {
    community: { type: String, required: true },
    username: { type: String, required: true },
    userImage: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    comments: [commentSchema],
    votes: { type: [{ username: String, vote: Boolean }], required: true },
  },
  { timestamps: true }
);

export const Post = models.Post || model("Post", postSchema);
