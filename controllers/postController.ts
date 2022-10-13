import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { Post } from "../models/PostModel";
import { authOptions } from "../pages/api/auth/[...nextauth]";

export const getPost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const post = await Post.find(req.query).sort({ createdAt: -1 });

    return res.status(200).json(post);
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};

export const searchPost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const post = await Post.find({
      title: {
        $regex: req.query.q,
        $options: "i",
      },
    }).sort({ createdAt: -1 });

    return res.status(200).json(post);
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ message: "Authentication error" });
    }

    const { community, title, content } = req.body;

    const post = await Post.create({
      uid: session.user.uid,
      username: session.user?.name,
      userImage: session.user?.image,
      community,
      title,
      content,
      comments: [],
      vote: [],
      saved: [],
    });

    return res.status(200).json(post);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const deletePost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ message: "Authentication error" });
    }

    const post = await Post.findById(req.query._id);

    //Check if the user is authorized
    if (session.user.uid !== post.uid) {
      return res.status(401).json({ message: "Authorization error" });
    }

    await Post.findByIdAndDelete(req.query._id);

    return res.status(200).json(post);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteComment = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ message: "Authentication error" });
    }

    const post = await Post.findOne({ "comments._id": req.query._id });

    //Check if the user is authorized
    if (session.user.uid !== post.comments.id(req.query._id).uid) {
      return res.status(401).json({ message: "Authorization error" });
    }

    post.comments.id(req.query._id).remove();
    post.markModified("comments");
    await post.save();

    return res.status(200).json(post);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const votePost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ message: "Authentication error" });
    }

    const { votes } = req.body;

    const post = await Post.findByIdAndUpdate(req.query._id, { votes });

    return res.status(200).json(post);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const commentPost = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ message: "Authentication error" });
    }

    const { content } = req.body;

    const post = await Post.findById(req.query._id);
    post.comments.push({
      uid: session.user.uid,
      username: session.user?.name,
      userImage: session.user?.image,
      content,
    });
    post.markModified("comments");
    await post.save();

    return res.status(200).json(post);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const savePost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ message: "Authentication error" });
    }

    const post = await Post.findById(req.query._id);

    if (post.saved.find((x: string) => x === session.user.uid)) {
      post.saved = post.saved.filter((x: string) => x !== session.user.uid);
    } else {
      post.saved.push(session.user.uid);
    }

    post.markModified("saved");
    await post.save();

    return res.status(200).json(post);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
