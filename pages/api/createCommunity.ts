import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { Community } from "../../models/CommunityModel";
import { connectMongo } from "../../utils/mongodb";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { name, admin } = req.body;
    const session = await unstable_getServerSession(req, res, authOptions);

    if (req.method !== "POST") {
      res.status(400).json({ message: "Please send a post request" });
    }

    if (!session) {
      res.status(401).json({ message: "Please log in" });
      return;
    }

    await connectMongo();
    const post = await Community.create({ name, admin });
    res.status(200).json(post);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}
