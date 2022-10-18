import React, { useEffect, useState } from "react";
import { GoArrowUp, GoArrowDown, GoComment } from "react-icons/go";
import { BsBookmark, BsBookmarkFill, BsTrash } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import TimeAgo from "react-timeago";
import { PostType } from "../types/post";
import Link from "next/link";
import useClickOutside from "../hooks/useClickOutside";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

interface IProps {
  post: PostType;
}

const Post = ({ post }: IProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const menuRef = useClickOutside(() => setMenuVisible(false));
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    () => axios.delete(`/api/post?type=post&_id=${post._id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
        if (router.query.pid) router.push("/");
      },
    }
  );

  const voteMutation = useMutation(
    (vote: boolean) =>
      axios.put(`/api/post?action=vote&_id=${post._id}`, {
        vote,
      }),
    { onSuccess: () => queryClient.invalidateQueries(["posts"]) }
  );

  const handleSavePost = async () => {
    if (!session) return;

    try {
      await axios.put(`/api/post?action=save&_id=${post._id}`);
      setIsSaved((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (post.saved.find((x) => x === session?.user.uid)) setIsSaved(true);
    else setIsSaved(false);
  }, [post]);

  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-md flex overflow-hidden">
      <div className="p-2 w-10 bg-black bg-opacity-20 text-xl flex flex-col items-center gap-2">
        <button
          onClick={() => {
            if (!session) return;
            voteMutation.mutate(true);
          }}
          disabled={session ? false : true}
          className={`rounded-sm bg-white bg-opacity-0 hover:bg-opacity-5 hover:text-orange-600 ${
            post.votes?.find(
              (x) => x.uid === session?.user?.uid && x.vote === true
            ) && "text-orange-600"
          }`}
        >
          <GoArrowUp />
        </button>
        <div className="text-xs font-semibold">
          {post.votes?.reduce(
            (total, x) => (x.vote ? (total += 1) : (total -= 1)),
            0
          )}
        </div>
        <button
          onClick={() => {
            if (!session) return;
            voteMutation.mutate(false);
          }}
          disabled={session ? false : true}
          className={`rounded-sm bg-white bg-opacity-0 hover:bg-opacity-5 hover:text-blue-600 ${
            post.votes?.find(
              (x) => x.uid === session?.user?.uid && x.vote === false
            ) && "text-blue-600"
          }`}
        >
          <GoArrowDown />
        </button>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="text-xs flex items-center px-2 pt-2">
          {post.userImage && (
            <div className="relative w-6 h-6 overflow-hidden rounded-full mr-2">
              <Image src={post.userImage} alt="" layout="fill" />
            </div>
          )}
          <Link href={`/r/${post?.community}`}>
            <a className="font-bold hover:underline hover:cursor-pointer">
              r/{post?.community}
            </a>
          </Link>
          <div className="text-neutral-500 font-normal">
            <span className="mx-1">• Posted by u/{post?.username}</span>
            <span>{post.createdAt && <TimeAgo date={post.createdAt} />}</span>
          </div>
          {post?.uid === session?.user?.uid && (
            <div className="ml-auto relative select-none">
              <div
                ref={menuRef}
                onClick={() => setMenuVisible((prev) => !prev)}
                className="text-lg cursor-pointer text-neutral-500 hover:text-neutral-400"
              >
                <FiMoreHorizontal />
              </div>
              {isMenuVisible && (
                <div className="absolute bg-neutral-900 border border-neutral-700 rounded-md overflow-hidden right-0 top-6 z-10 cursor-pointer shadow-md shadow-black">
                  <button
                    onClick={() => {
                      if (!session || post?.uid !== session?.user?.uid) return;
                      deleteMutation.mutate();
                    }}
                    className="hover:bg-neutral-700 p-2 flex gap-1 items-center text-red-500"
                  >
                    <BsTrash />
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="px-2 flex flex-col gap-2">
          <Link href={`/r/${post.community}/${post._id}`}>
            <a className="w-fit font-semibold text-lg hover:underline">
              {post?.title}
            </a>
          </Link>
          <div>{post?.content}</div>
        </div>
        <div className="flex text-neutral-500 font-medium text-sm">
          <Link href={`/r/${post.community}/${post._id}`}>
            <a className="flex items-center gap-2 p-2 rounded-sm bg-white bg-opacity-0 hover:bg-opacity-5">
              <GoComment className="text-lg" />
              {post?.comments?.length} comments
            </a>
          </Link>
          {session && (
            <button
              onClick={handleSavePost}
              className="flex items-center gap-2 p-2 rounded-sm bg-white bg-opacity-0 hover:bg-opacity-5"
            >
              {isSaved ? (
                <BsBookmarkFill className="text-lg" />
              ) : (
                <BsBookmark className="text-lg" />
              )}
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
