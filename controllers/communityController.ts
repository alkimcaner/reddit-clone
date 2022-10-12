import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { Community } from "../models/CommunityModel";
import { Post } from "../models/PostModel";
import { authOptions } from "../pages/api/auth/[...nextauth]";

export const getCommunity = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
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

    if (!session) {
      return res.status(401).json({ message: "Authentication error" });
    }

    const { name, about } = req.body;

    const community = await Community.create({
      uid: session.user.uid,
      owner: session.user?.name,
      name,
      about,
    });

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

    if (!session) {
      return res.status(401).json({ message: "Authentication error" });
    }

    const community = await Community.findById(req.query._id);

    if (session.user.uid !== community.uid) {
      return res.status(401).json({ message: "Authorization error" });
    }

    await Promise.all([
      Community.findByIdAndDelete(req.query._id),
      Post.deleteMany({ community: community.name }),
    ]);

    return res.status(200).json(community);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
