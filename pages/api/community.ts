import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import {
  getCommunity,
  createCommunity,
  deleteCommunity,
} from "../../controllers/communityController";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  switch (req.method) {
    case "GET":
      await getCommunity(req, res);
      break;
    case "POST":
      await createCommunity(req, res);
      break;
    case "DELETE":
      await deleteCommunity(req, res);
      break;
    default:
      return res.status(400).json({ message: "Invalid request" });
      break;
  }
};

export default handler;
