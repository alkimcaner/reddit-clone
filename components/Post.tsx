import React from "react";
import { GoArrowUp, GoArrowDown, GoComment } from "react-icons/go";
import { IoMdShareAlt } from "react-icons/io";
import { BsBookmark } from "react-icons/bs";

const Post = () => {
  return (
    <div className="bg-neutral-900 border border-neutral-700 rounded-md flex">
      <div
        id="vote"
        className="p-2 w-10 bg-black bg-opacity-20 text-xl flex flex-col items-center gap-2"
      >
        <button className="bg-white bg-opacity-0 hover:bg-opacity-10 hover:text-orange-600 rounded-sm">
          <GoArrowUp />
        </button>
        <div className="text-xs font-semibold">724</div>
        <button className="bg-white bg-opacity-0 hover:bg-opacity-10 hover:text-blue-600 rounded-sm">
          <GoArrowDown />
        </button>
      </div>
      <div id="post" className="p-2 flex flex-col gap-2">
        <div id="info" className="text-xs font-bold">
          r/javascript{" "}
          <span className="text-neutral-500 font-normal">
            • Posted by u/flawn 12 hours ago
          </span>
        </div>
        <div id="title" className="font-semibold text-lg">
          Test 123
        </div>
        <div id="content" className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
          accusantium iusto ratione ea praesentium. Nemo ipsum sequi voluptas
          fugit dolores minima nihil impedit neque nostrum perspiciatis.
          Veritatis dicta inventore fugit?
        </div>
        <div id="menu" className="flex text-neutral-500 font-medium text-sm">
          <button className="flex items-center gap-2 p-2 rounded-md bg-white bg-opacity-0 hover:bg-opacity-10">
            <GoComment className="text-lg" />
            182 comments
          </button>
          <button className="flex items-center gap-2 p-2 rounded-md bg-white bg-opacity-0 hover:bg-opacity-10">
            <IoMdShareAlt className="text-lg" />
            Share
          </button>
          <button className="flex items-center gap-2 p-2 rounded-md bg-white bg-opacity-0 hover:bg-opacity-10">
            <BsBookmark className="text-lg" />
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
