import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import {
  getPost,
  createPost,
  deletePost,
  deleteComment,
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
      if (req.query.type === "post") await deletePost(req, res);
      if (req.query.type === "comment") await deleteComment(req, res);
      else res.status(400).end();
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
