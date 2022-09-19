import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { Post } from "../models/PostModel";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { connectMongo } from "../utils/mongodb";

export const getPost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectMongo();
    const posts = await Post.find(req.query).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) res.status(401).json({ message: "Please log in" });

    const { community, username, title, content, comments, vote } = req.body;
    await connectMongo();
    const post = await Post.create({
      community,
      username,
      title,
      content,
      comments,
      vote,
    });
    res.status(200).json(post);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
