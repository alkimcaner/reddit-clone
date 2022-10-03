import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import {
  getPost,
  createPost,
  deletePost,
  votePost,
  commentPost,
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
    case "PUT":
      if (req.query.action === "vote") await votePost(req, res);
      else if (req.query.action === "comment") await commentPost(req, res);
      else res.status(400).end();
      break;
    default:
      return res.status(400).json({ message: "Invalid request" });
      break;
  }
};

export default handler;
