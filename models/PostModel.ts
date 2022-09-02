import { Schema, model, models } from "mongoose";

const postSchema = new Schema(
  {
    subreddit: { type: String, required: true },
    username: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    comments: [
      {
        _id: { type: String, required: true },
        username: { type: String, required: true },
        content: { type: String, required: true },
        vote: { type: Number, required: true },
        createdAt: { type: Number, required: true },
      },
    ],
    vote: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Post = models.Post || model("Post", postSchema);
