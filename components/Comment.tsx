import Image from "next/image";
import React from "react";
import Timeago from "react-timeago";
import { PostType } from "../types/post";

const Comment = ({ comment }: { comment: PostType["comments"][number] }) => {
  return (
    <div className="p-2 flex flex-col gap-4 w-full">
      <div className="text-xs flex items-center">
        {comment.userImage && (
          <div className="relative w-6 h-6 overflow-hidden rounded-full mr-2">
            <Image src={comment.userImage} alt="" layout="fill" />
          </div>
        )}
        <span className="font-bold">{comment.username}</span>
        <span className="text-neutral-500 ml-1">
          • {<Timeago date={comment.createdAt} />}
        </span>
      </div>
      <div>{comment.content}</div>
    </div>
  );
};

export default Comment;
