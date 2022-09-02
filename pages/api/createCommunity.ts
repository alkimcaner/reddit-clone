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

    if (!session) {
      res.status(401).json({ error: "Please log in" });
      return;
    }

    await connectMongo();
    const post = await Community.create({ name, admin });
    res.status(200).json(post);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
