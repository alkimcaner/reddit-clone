import React, { useEffect, useState } from "react";
import { GoArrowUp, GoArrowDown, GoComment } from "react-icons/go";
import { BsBookmark } from "react-icons/bs";
import TimeAgo from "react-timeago";
import { PostType } from "../types/post";
import Link from "next/link";

const Post = ({ post }: { post: PostType }) => {
  const [postCreatedAt, setPostCreatedAt] = useState<Date>();

  useEffect(() => setPostCreatedAt(post.createdAt), [post]);

  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-md flex overflow-hidden">
      <div className="p-2 w-10 bg-black bg-opacity-20 text-xl flex flex-col items-center gap-2">
        <button className="bg-white bg-opacity-0 hover:bg-opacity-5 hover:text-orange-600 rounded-sm">
          <GoArrowUp />
        </button>
        <div className="text-xs font-semibold">{post?.vote}</div>
        <button className="bg-white bg-opacity-0 hover:bg-opacity-5 hover:text-blue-600 rounded-sm">
          <GoArrowDown />
        </button>
      </div>
      <div className="p-2 flex flex-col gap-2">
        <div className="text-xs font-bold">
          <Link href={`/r/${post?.community}`}>
            <span className="hover:underline hover:cursor-pointer">
              r/{post?.community}
            </span>
          </Link>
          <span className="text-neutral-500 font-normal">
            {" "}
            • Posted by u/{post?.username}{" "}
            {postCreatedAt && <TimeAgo date={postCreatedAt} />}
          </span>
        </div>
        <div className="font-semibold text-lg">{post?.title}</div>
        <div>{post?.content}</div>
        <div className="flex text-neutral-500 font-medium text-sm">
          <button className="flex items-center gap-2 p-2 rounded-sm bg-white bg-opacity-0 hover:bg-opacity-5">
            <GoComment className="text-lg" />
            {post?.comments.length} comments
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
