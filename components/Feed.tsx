import { UseQueryResult } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { PostType } from "../types/post";
import Post from "./Post";

interface IProps {
  postQuery: UseQueryResult<PostType[]>;
}

const Feed = ({ postQuery }: IProps) => {
  //Loading state
  if (postQuery.isLoading)
    return (
      <Image
        src="/assets/loading.svg"
        alt="loading"
        width={64}
        height={64}
        priority
      />
    );
  //Error state
  if (postQuery.isError)
    return (
      <p className="text-neutral-500 text-lg text-center mb-4">
        Something went wrong 🧐
      </p>
    );
  //Empty state
  if (!postQuery.data?.length)
    return (
      <p className="text-neutral-500 text-lg text-center mb-4">
        There are no posts
      </p>
    );

  return (
    <>
      {postQuery.data?.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </>
  );
};

export default Feed;
