import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import TimeAgo from "react-timeago";
import { CommunityType } from "../types/community";

const CommunityWidget = ({ community }: { community: CommunityType }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [communityCreatedAt, setCommunityCreatedAt] = useState<Date>();

  const handleDeleteCommunity = async () => {
    try {
      const res = await axios.delete(`/api/community?name=${community.name}`);
      router.push("/");
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => setCommunityCreatedAt(community.createdAt), [community]);

  return (
    <div className="flex flex-col justify-center gap-4 bg-neutral-900 border border-neutral-700 rounded-md h-fit px-2 py-4">
      <div className="border-b border-neutral-700 pb-4">
        <h2 className="font-bold">r/{community?.name}</h2>
        <p className="text-xs text-neutral-500">
          Created by {community?.admin}{" "}
          {communityCreatedAt && <TimeAgo date={communityCreatedAt} />}
        </p>
      </div>
      <div>
        <h2 className="font-semibold text-neutral-500">About Community</h2>
        <p className="py-2">{community?.about}</p>
      </div>
      {session?.user?.name === community.admin && (
        <button
          onClick={handleDeleteCommunity}
          className="bg-red-500 hover:bg-red-600 text-neutral-200 font-bold rounded-full py-1 text-center"
        >
          Delete community
        </button>
      )}
      {session && (
        <Link href="/create-post">
          <a className="bg-white hover:bg-neutral-200 text-neutral-900 font-bold rounded-full py-1 text-center">
            Create post
          </a>
        </Link>
      )}
    </div>
  );
};

export default CommunityWidget;
