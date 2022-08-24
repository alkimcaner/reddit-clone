import React from "react";
import { GoArrowUp, GoArrowDown, GoComment } from "react-icons/go";
import { IoMdShareAlt } from "react-icons/io";
import { BsBookmark } from "react-icons/bs";
import TimeAgo from "react-timeago";
import { PostType } from "../pages/index";

const Post = ({ post }: { post: PostType }) => {
  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-md flex">
      <div className="p-2 w-10 bg-black bg-opacity-20 text-xl flex flex-col items-center gap-2">
        <button className="bg-white bg-opacity-0 hover:bg-opacity-5 hover:text-orange-600 rounded-sm">
          <GoArrowUp />
        </button>
        <div className="text-xs font-semibold">{post.vote}</div>
        <button className="bg-white bg-opacity-0 hover:bg-opacity-5 hover:text-blue-600 rounded-sm">
          <GoArrowDown />
        </button>
      </div>
      <div className="p-2 flex flex-col gap-2">
        <div className="text-xs font-bold">
          r/{post.subreddit}{" "}
          <span className="text-neutral-500 font-normal">
            • Posted by u/{post.username}{" "}
            <TimeAgo date={post.createdAt || Date.now()} />
          </span>
        </div>
        <div className="font-semibold text-lg">{post.title}</div>
        <div>{post.content}</div>
        <div className="flex text-neutral-500 font-medium text-sm">
          <button className="flex items-center gap-2 p-2 rounded-sm bg-white bg-opacity-0 hover:bg-opacity-5">
            <GoComment className="text-lg" />
            {post.comments.length} comments
          </button>
          <button className="flex items-center gap-2 p-2 rounded-sm bg-white bg-opacity-0 hover:bg-opacity-5">
            <IoMdShareAlt className="text-lg" />
            Share
          </button>
          <button className="flex items-center gap-2 p-2 rounded-sm bg-white bg-opacity-0 hover:bg-opacity-5">
            <BsBookmark className="text-lg" />
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
