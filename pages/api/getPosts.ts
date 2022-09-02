import { NextApiRequest, NextApiResponse } from "next";
import { PostType } from "../../types/PostType";
import { connectMongo } from "../../utils/mongodb";
import { Post } from "../../models/PostModel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostType[] | { message: any }>
) {
  try {
    await connectMongo();
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
}
