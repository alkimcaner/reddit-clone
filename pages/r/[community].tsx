import axios from "axios";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import CommunityWidget from "../../components/CommunityWidget";
import Navbar from "../../components/Navbar";
import Post from "../../components/Post";
import { CommunityType } from "../../types/community";
import { PostType } from "../../types/post";

export const getServerSideProps = async (ctx: any) => {
  try {
    const communityRes = await axios.get(
      process.env.NEXTAUTH_URL + "api/community?name=" + ctx.query?.community
    );
    const communityData = communityRes.data[0];

    if (!communityData) return { redirect: { destination: "/" } };

    const postsRes = await axios.get(
      process.env.NEXTAUTH_URL + "api/post?community=" + ctx.query?.community
    );
    const postsData = postsRes.data;

    return { props: { communityData, postsData } };
  } catch (error) {
    console.log(error);
    return { props: {} };
  }
};

const Community: NextPage<{
  communityData: CommunityType;
  postsData: PostType[];
}> = ({ communityData, postsData }) => {
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
          {postsData?.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
        {communityData && <CommunityWidget communityData={communityData} />}
      </main>
    </div>
  );
};

export default Community;
