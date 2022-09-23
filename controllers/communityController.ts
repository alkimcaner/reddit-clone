import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { Community } from "../models/CommunityModel";
import { Post } from "../models/PostModel";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { connectMongo } from "../utils/mongodb";

export const getCommunity = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    await connectMongo();
    const community = await Community.find(req.query).sort({ createdAt: -1 });
    return res.status(200).json(community);
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};

export const createCommunity = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session)
      return res.status(401).json({ message: "Authorization error" });

    const { name, about, admin } = req.body;
    await connectMongo();
    const community = await Community.create({ name, about, admin });
    return res.status(200).json(community);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteCommunity = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session)
      return res.status(401).json({ message: "Authorization error" });

    await connectMongo();
    const community = await Community.findOneAndDelete({
      name: req.query.name,
      admin: session?.user?.name,
    });
    const posts = await Post.deleteMany({ community: req.query.name });
    return res.status(200).json(community);
  } catch (error: any) {
    console.log("CATCH BLOCK STILL RUNS");
    return res.status(400).json({ message: error.message });
  }
};
