import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "../../utils/mongodb";
import { Post } from "../../models/PostModel";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    if (req.method !== "GET") {
      res.status(400).json({ message: "Please send a get request" });
    }

    if (req.query.community) {
      await connectMongo();
      const posts = await Post.find({ community: req.query.community }).sort({
        createdAt: -1,
      });
      res.status(200).json(posts);
    } else {
      await connectMongo();
      const posts = await Post.find().sort({ createdAt: -1 });
      res.status(200).json(posts);
    }
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export default handler;
