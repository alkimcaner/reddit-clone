import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import {
  getPost,
  createPost,
  deletePost,
} from "../../controllers/postController";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  switch (req.method) {
    case "GET":
      await getPost(req, res);
      break;
    case "POST":
      await createPost(req, res);
      break;
    case "DELETE":
      await deletePost(req, res);
      break;
    default:
      return res.status(400).json({ message: "Invalid request" });
      break;
  }
};

export default handler;
