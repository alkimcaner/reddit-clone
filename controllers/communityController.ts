import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { Community } from "../models/CommunityModel";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { connectMongo } from "../utils/mongodb";

export const getCommunity = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    await connectMongo();
    const communities = await Community.find(req.query).sort({ createdAt: -1 });
    res.status(200).json(communities);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const createCommunity = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) res.status(401).json({ message: "Please log in" });

    const { name, about, admin } = req.body;
    await connectMongo();
    const community = await Community.create({ name, about, admin });
    res.status(200).json(community);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
