import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { Post } from "../models/PostModel";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { connectMongo } from "../utils/mongodb";

export const getPost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectMongo();
    const post = await Post.find(req.query).sort({ createdAt: -1 });
    return res.status(200).json(post);
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session)
      return res.status(401).json({ message: "Authorization error" });

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
    return res.status(200).json(post);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const deletePost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session)
      return res.status(401).json({ message: "Authorization error" });

    await connectMongo();
    const post = await Post.findOneAndDelete({
      _id: req.query._id,
      username: session?.user?.name,
    });
    return res.status(200).json(post);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const updatePost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session)
      return res.status(401).json({ message: "Authorization error" });

    const { postState } = req.body;
    await connectMongo();
    const post = await Post.findOneAndUpdate(
      {
        _id: req.query._id,
        username: session?.user?.name,
      },
      postState
    );
    return res.status(200).json(post);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
