import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import HomeWidget from "../components/HomeWidget";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import { CommunityType } from "../types/community";
import { PostType } from "../types/post";

export const getServerSideProps = async (ctx: any) => {
  try {
    const postsRes = await axios.get(
      `${process.env.NEXTAUTH_URL}api/post?q=${ctx.query?.q}`
    );
    const communitiesRes = await axios.get(
      `${process.env.NEXTAUTH_URL}api/community`
    );
    return {
      props: { posts: postsRes.data, communities: communitiesRes },
    };
  } catch (error) {
    console.log(error);
    return { props: {} };
  }
};

interface IProps {
  posts: PostType[];
  communities: CommunityType[];
}

const Home: NextPage<IProps> = ({ posts, communities }) => {
  return (
    <div className="bg-black text-neutral-300 min-h-screen">
      <Head>
        <title>Reddit Clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar communities={communities} />

      <main className="max-w-5xl mx-auto p-4 grid grid-cols-3 gap-4">
        <section className="flex flex-col gap-4 col-span-3 lg:col-span-2">
          {posts?.length ? (
            posts?.map((post) => <Post key={post._id} post={post} />)
          ) : (
            <p className="text-neutral-500 text-lg text-center mb-4">
              There are no posts
            </p>
          )}
        </section>
        <section>
          <HomeWidget />
        </section>
      </main>
    </div>
  );
};

export default Home;