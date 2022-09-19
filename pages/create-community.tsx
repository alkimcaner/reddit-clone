import React, { MouseEvent, useRef, useEffect } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import { NextPage } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import { useSession } from "next-auth/react";
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

  return { props: {} };
};

const CreateCommunity: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const nameRef = useRef<HTMLInputElement>(null);
  const aboutRef = useRef<HTMLTextAreaElement>(null);

  const handleCreate = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!nameRef.current?.value || !aboutRef.current?.value) {
      alert("Please enter a community name");
      return;
    }

    const response = await axios.post("api/community", {
      name: nameRef.current.value,
      about: aboutRef.current.value,
      admin: session?.user?.name,
    });

    router.push("/");
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
          <div>
            <h1 className="py-4 mb-4 font-bold text-lg border-b border-neutral-700">
              Create a community
            </h1>

            <div className="bg-neutral-900 rounded-md flex flex-col gap-4 p-4">
              <div className="border border-neutral-700 rounded-md w-full flex items-center gap-1 focus-within:border-white">
                <p className="ml-2">r/</p>
                <input
                  ref={nameRef}
                  type="text"
                  placeholder="Name"
                  className="bg-transparent py-2 w-full outline-none"
                />
              </div>
              <div className="border border-neutral-700 rounded-md w-full">
                <textarea
                  ref={aboutRef}
                  placeholder="About"
                  className="bg-transparent p-2 w-full min-h-[8rem]"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleCreate}
                  className="bg-gray-100 hover:bg-gray-300 py-1 px-4 rounded-full text-black font-semibold"
                >
                  Create Community
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

export default CreateCommunity;
