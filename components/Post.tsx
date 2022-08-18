import React from "react";
import { GoArrowUp, GoArrowDown, GoComment } from "react-icons/go";
import { IoMdShareAlt } from "react-icons/io";
import { BsBookmark } from "react-icons/bs";
import TimeAgo from "react-timeago";

interface PostType {
  subreddit: string;
  username: string;
  title: string;
  content: string;
  comments: Object[];
  vote: number;
  createdAt: number;
}

const Post: React.FC<PostType> = ({
  subreddit,
  username,
  title,
  content,
  comments,
  vote,
  createdAt,
}) => {
  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-md flex">
      <div
        id="vote"
        className="p-2 w-10 bg-black bg-opacity-20 text-xl flex flex-col items-center gap-2"
      >
        <button className="bg-white bg-opacity-0 hover:bg-opacity-5 hover:text-orange-600 rounded-sm">
          <GoArrowUp />
        </button>
        <div className="text-xs font-semibold">{vote}</div>
        <button className="bg-white bg-opacity-0 hover:bg-opacity-5 hover:text-blue-600 rounded-sm">
          <GoArrowDown />
        </button>
      </div>
      <div id="post" className="p-2 flex flex-col gap-2">
        <div id="info" className="text-xs font-bold">
          r/{subreddit}{" "}
          <span className="text-neutral-500 font-normal">
            • Posted by u/{username} <TimeAgo date={createdAt || Date.now()} />
          </span>
        </div>
        <div id="title" className="font-semibold text-lg">
          {title}
        </div>
        <div id="content" className="">
          {content}
        </div>
        <div id="menu" className="flex text-neutral-500 font-medium text-sm">
          <button className="flex items-center gap-2 p-2 rounded-sm bg-white bg-opacity-0 hover:bg-opacity-5">
            <GoComment className="text-lg" />
            {comments.length} comments
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
