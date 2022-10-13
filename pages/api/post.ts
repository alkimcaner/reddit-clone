import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import {
  getPost,
  createPost,
  deletePost,
  deleteComment,
  votePost,
  commentPost,
  searchPost,
  savePost,
} from "../../controllers/postController";
import { connectMongo } from "../../utils/mongodb";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await connectMongo();

  switch (req.method) {
    case "GET":
      if (req.query.q) await searchPost(req, res);
      else await getPost(req, res);
      break;
    case "POST":
      await createPost(req, res);
      break;
    case "DELETE":
      if (req.query.type === "post") await deletePost(req, res);
      else if (req.query.type === "comment") await deleteComment(req, res);
      else return res.status(400).json({ message: "Invalid request" });
      break;
    case "PUT":
      if (req.query.action === "vote") await votePost(req, res);
      else if (req.query.action === "comment") await commentPost(req, res);
      else if (req.query.action === "save") await savePost(req, res);
      else return res.status(400).json({ message: "Invalid request" });
      break;
    default:
      return res.status(400).json({ message: "Invalid request" });
      break;
  }
};

export default handler;
