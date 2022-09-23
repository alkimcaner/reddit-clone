import React, { MouseEvent, useEffect, useRef, useState } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import { NextPage } from "next";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useRouter } from "next/router";
import useClickOutside from "../hooks/useClickOutside";
import axios from "axios";
import { useSession } from "next-auth/react";
import { CommunityType } from "../types/community";
import HomeWidget from "../components/HomeWidget";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

export const getServerSideProps = async (ctx: any) => {
  //Redirect to homepage if not logged in
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );
  if (!session) return { redirect: { destination: "/" } };

  try {
    const response = await axios.get(
      process.env.NEXTAUTH_URL + "api/community"
    );
    const communities = response.data;
    return {
      props: { communities },
    };
  } catch (error) {
    console.log(error);
    return { props: {} };
  }
};

const CreatePost: NextPage<{ communities: CommunityType[] }> = ({
  communities,
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isCommunityMenuOpen, setIsCommunityMenuOpen] = useState(false);
  const [community, setCommunity] = useState<string>();
  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const menuRef = useClickOutside(() => setIsCommunityMenuOpen(false));

  const handlePost = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      if (!titleRef.current?.value || !textRef.current?.value || !community) {
        alert("Please fill in the blanks");
        return;
      }

      const response = await axios.post("api/post", {
        community: community,
        username: session?.user?.name,
        title: titleRef.current.value,
        content: textRef.current.value,
        comments: [],
        vote: [],
      });

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-black text-neutral-300 min-h-screen">
      <Head>
        <title>Reddit Clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="max-w-5xl mx-auto p-4 grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-4 col-span-3 lg:col-span-2">
          <div className="flex flex-col gap-4">
            <h1 className="py-4 font-bold text-lg border-b border-neutral-700">
              Create a post
            </h1>
            <div className="select-none">
              <div
                ref={menuRef}
                onClick={() => setIsCommunityMenuOpen((prev) => !prev)}
                className="bg-neutral-900 border border-neutral-700 rounded-md p-2 w-64 font-semibold text-sm flex items-center gap-8 cursor-pointer"
              >
                {community ? <>r/{community}</> : <>Choose a community</>}
                <MdKeyboardArrowDown className="ml-auto" />
              </div>
              {isCommunityMenuOpen && (
                <div className="absolute overflow-hidden bg-neutral-900 border border-neutral-700 rounded-md mt-1 w-64 text-sm flex flex-col justify-center cursor-pointer">
                  {communities?.map((community, index) => (
                    <div
                      key={index}
                      onClick={() => setCommunity(community.name)}
                      className="py-2 px-4 hover:bg-neutral-800"
                    >
                      r/{community.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="bg-neutral-900 rounded-md flex flex-col gap-4 p-4">
              <div className="border border-neutral-700 rounded-md w-full">
                <input
                  ref={titleRef}
                  type="text"
                  placeholder="Title"
                  className="bg-transparent p-2 w-full"
                />
              </div>
              <div className="border border-neutral-700 rounded-md w-full">
                <textarea
                  ref={textRef}
                  placeholder="Text"
                  className="bg-transparent p-2 w-full min-h-[8rem]"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handlePost}
                  className="bg-gray-100 hover:bg-gray-300 py-1 px-4 rounded-full text-black font-semibold"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
        <HomeWidget />
      </main>
    </div>
  );
};

export default CreatePost;
