import { NextApiRequest, NextApiResponse } from "next";
import { PostType } from "../index";
import { connectMongo } from "../../utils/mongodb";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostType[] | { message: any }>
) {
  try {
    res.status(200).json([
      {
        _id: "asdasd123",
        subreddit: "javascript",
        username: "flawn",
        title: "test",
        content: "hi",
        comments: [],
        vote: 0,
        createdAt: 0,
      },
    ]);
  } catch (error) {
    res.status(404).json({ message: error });
  }
}
