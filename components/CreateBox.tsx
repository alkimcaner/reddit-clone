import Link from "next/link";
import React from "react";

const CreateBox = () => {
  return (
    <div className="hidden lg:flex flex-col justify-center gap-4 bg-neutral-900 border border-neutral-700 rounded-md h-60 p-2">
      <h2 className="font-semibold">Home</h2>
      <p>
        Your personal Reddit frontpage. Come here to check in with your favorite
        communities.
      </p>
      <Link href="create-post">
        <button className="bg-white bg-opacity-80 hover:bg-opacity-70 text-neutral-900 font-bold rounded-full py-1">
          Create post
        </button>
      </Link>
      <Link href="create-community">
        <button className="bg-white bg-opacity-0 hover:bg-opacity-5 border font-bold rounded-full py-1">
          Create community
        </button>
      </Link>
    </div>
  );
};

export default CreateBox;
