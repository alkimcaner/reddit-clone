import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import Timeago from "react-timeago";
import useClickOutside from "../hooks/useClickOutside";
import { PostType } from "../types/post";

interface IProps {
  comment: PostType["comments"][number];
}

const Comment = ({ comment }: IProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isMenuVisible, setMenuVisible] = useState(false);
  const menuRef = useClickOutside(() => setMenuVisible(false));

  const handleDeleteComment = async () => {
    if (!session || comment?.uid !== session?.user?.uid) return;
    await axios.delete(`/api/post?type=comment&_id=${comment._id}`);
    router.reload();
  };

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
        {comment?.uid === session?.user?.uid && (
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
                  onClick={handleDeleteComment}
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
      <div>{comment.content}</div>
    </div>
  );
};

export default Comment;
