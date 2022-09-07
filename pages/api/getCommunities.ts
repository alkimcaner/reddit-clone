import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "../../utils/mongodb";
import { Community } from "../../models/CommunityModel";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    if (req.method !== "GET") {
      res.status(400).json({ message: "Please send a get request" });
    }

    if (req.query.name) {
      await connectMongo();
      const communities = await Community.find({ name: req.query.name });
      res.status(200).json(communities);
    } else {
      await connectMongo();
      const communities = await Community.find().sort({ createdAt: -1 });
      res.status(200).json(communities);
    }
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export default handler;
