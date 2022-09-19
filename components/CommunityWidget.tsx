import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TimeAgo from "react-timeago";
import { CommunityType } from "../types/community";

const CommunityWidget = ({
  communityData,
}: {
  communityData: CommunityType;
}) => {
  const { data: session } = useSession();
  const [communityCreatedAt, setCommunityCreatedAt] = useState<Date>();

  useEffect(
    () => setCommunityCreatedAt(communityData.createdAt),
    [communityData]
  );

  return (
    <div className="row-start-1 lg:row-start-auto col-span-3 lg:col-span-1 flex flex-col justify-center gap-4 bg-neutral-900 border border-neutral-700 rounded-md h-fit px-2 py-4">
      <div className="border-b border-neutral-700 pb-4">
        <h2 className="font-bold">r/{communityData?.name}</h2>
        <p className="text-xs text-neutral-500">
          Created by {communityData?.admin}{" "}
          {communityCreatedAt && <TimeAgo date={communityCreatedAt} />}
        </p>
      </div>
      <div>
        <h2 className="font-semibold text-neutral-500">About Community</h2>
        <p className="py-2">{communityData?.about}</p>
      </div>
      {session && (
        <Link href="/create-post">
          <button className="bg-white bg-opacity-80 hover:bg-opacity-70 text-neutral-900 font-bold rounded-full py-1">
            Create post
          </button>
        </Link>
      )}
    </div>
  );
};

export default CommunityWidget;
