import React, { useEffect, useState, useCallback } from "react";
import { GoArrowUp, GoArrowDown, GoComment } from "react-icons/go";
import { BsBookmark, BsTrash } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import TimeAgo from "react-timeago";
import { PostType } from "../types/post";
import Link from "next/link";
import useClickOutside from "../hooks/useClickOutside";
import axios from "axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Post = ({ post }: { post: PostType }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [postCreatedAt, setPostCreatedAt] = useState<Date>();
  const [isMenuVisible, setMenuVisible] = useState(false);
  const menuRef = useClickOutside(() => setMenuVisible(false));
  const handleDeletePost = useCallback(async () => {
    const res = await axios.delete(`/api/post?_id=${post._id}`);
    router.push("/");
  }, []);

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
      <div className="p-2 flex flex-col gap-2 w-full">
        <div className="text-xs flex">
          <Link href={`/r/${post?.community}`}>
            <span className="font-bold hover:underline hover:cursor-pointer">
              r/{post?.community}
            </span>
          </Link>
          <div className="text-neutral-500 font-normal">
            <span className="mx-1">• Posted by u/{post?.username}</span>
            <span>{postCreatedAt && <TimeAgo date={postCreatedAt} />}</span>
          </div>
          {session?.user?.name === post.username && (
            <div className="ml-auto relative select-none">
              <div
                ref={menuRef}
                onClick={() => setMenuVisible((prev) => !prev)}
                className="text-lg cursor-pointer text-neutral-500 hover:text-neutral-400"
              >
                <CgMoreO />
              </div>
              {isMenuVisible && (
                <div className="absolute bg-neutral-900 border border-neutral-700 rounded-md overflow-hidden right-0 top-8 z-10 cursor-pointer shadow-md shadow-black">
                  <div
                    onClick={handleDeletePost}
                    className="hover:bg-neutral-700 p-2 flex gap-1 items-center text-red-500"
                  >
                    <BsTrash />
                    Delete
                  </div>
                </div>
              )}
            </div>
          )}
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
