import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const HomeWidget = () => {
  const { data: session } = useSession();

  return (
    <div className="hidden lg:flex flex-col justify-center gap-4 bg-neutral-900 border border-neutral-700 rounded-md h-fit px-2 py-4">
      <h2 className="font-semibold">Home</h2>
      <p>
        Your personal Reddit frontpage. Come here to check in with your favorite
        communities.
      </p>
      {session && (
        <>
          <Link href="/create-post">
            <a className="bg-white hover:bg-neutral-200 text-neutral-900 font-bold rounded-full py-1 text-center">
              Create post
            </a>
          </Link>
          <Link href="/create-community">
            <a className="bg-white bg-opacity-0 hover:bg-opacity-5 border font-bold rounded-full py-1 text-center">
              Create community
            </a>
          </Link>
        </>
      )}
    </div>
  );
};

export default HomeWidget;
