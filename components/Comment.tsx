import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import Timeago from "react-timeago";
import useClickOutside from "../hooks/useClickOutside";
import { PostType } from "../types/post";

interface IProps {
  comment: PostType["comments"][number];
}

const Comment = ({ comment }: IProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const menuRef = useClickOutside(() => setMenuVisible(false));
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [createdAt, setCreatedAt] = useState<Date>();
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(
    () => axios.delete(`/api/post?type=comment&_id=${comment._id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          "posts",
          router.query.community,
          router.query.pid,
        ]);
      },
    }
  );

  useEffect(() => {
    setCreatedAt(comment.createdAt);
  }, []);

  return (
    <div className="p-4 flex flex-col gap-2 w-full">
      <div className="text-xs flex items-center">
        {comment.userImage && (
          <div className="relative w-6 h-6 overflow-hidden rounded-full mr-2">
            <Image src={comment.userImage} alt="" layout="fill" />
          </div>
        )}
        <span className="font-bold">{comment.username}</span>
        <span className="text-neutral-500 ml-1">
          • {createdAt && <Timeago date={createdAt} />}
        </span>
        {comment?.uid === session?.user?.uid && (
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
                    if (!session || comment?.uid !== session?.user?.uid) return;
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
      <div>{comment.content}</div>
    </div>
  );
};

export default Comment;
