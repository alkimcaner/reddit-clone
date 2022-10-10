import axios from "axios";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useMemo } from "react";
import CommunityWidget from "../../../components/CommunityWidget";
import Navbar from "../../../components/Navbar";
import Post from "../../../components/Post";
import { CommunityType } from "../../../types/community";
import { PostType } from "../../../types/post";
import subredditLogo from "../../../public/assets/subredditLogo.png";
import { useRouter } from "next/router";

export const getServerSideProps = async (ctx: any) => {
  try {
    const communitiesRes = await axios.get(
      `${process.env.NEXTAUTH_URL}api/community`
    );

    const postsRes = await axios.get(
      encodeURI(
        `${process.env.NEXTAUTH_URL}api/post?community=${ctx.query?.community}`
      )
    );

    return {
      props: { communities: communitiesRes.data, posts: postsRes.data },
    };
  } catch (error) {
    console.log(error);
    return { props: {} };
  }
};

interface IProps {
  communities: CommunityType[];
  posts: PostType[];
}

const Community: NextPage<IProps> = ({ communities, posts }) => {
  const router = useRouter();
  const community = useMemo(
    () => communities.find((x) => x.name === router.query.community)!,
    [router.query.community]
  );

  return (
    <div className="bg-black text-neutral-300 min-h-screen">
      <Head>
        <title>Reddit Clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar communities={communities} />

      <div className="bg-neutral-900 p-4">
        <div className="max-w-5xl mx-auto flex gap-4 items-center">
          <div className="w-12 h-12 relative">
            <Image src={subredditLogo} layout="fill" alt="" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">
              {community.name[0].toUpperCase() + community.name.substring(1)}
            </h1>
            <h1 className="text-neutral-500">r/{community.name}</h1>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto p-4 grid grid-cols-3 gap-4">
        <section className="flex flex-col gap-4 col-span-3 lg:col-span-2">
          {posts.length ? (
            posts?.map((post) => <Post key={post._id} post={post} />)
          ) : (
            <p className="text-neutral-500 text-lg text-center mb-4">
              There are no posts
            </p>
          )}
        </section>
        <section className="row-start-1 lg:row-start-auto col-span-3 lg:col-span-1">
          {community && <CommunityWidget community={community} />}
        </section>
      </main>
    </div>
  );
};

export default Community;
