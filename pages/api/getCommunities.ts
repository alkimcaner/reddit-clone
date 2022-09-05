import { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "../../utils/mongodb";
import { Community } from "../../models/CommunityModel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "GET") {
      res.status(400).json({ message: "Please send a get request" });
    }

    await connectMongo();
    const posts = await Community.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
}
