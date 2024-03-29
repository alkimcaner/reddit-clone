import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import Feed from "../components/Feed";
import HomeWidget from "../components/HomeWidget";
import Navbar from "../components/Navbar";
import { PostType } from "../types/post";

const Home: NextPage = () => {
  const postQuery = useQuery<PostType[]>(["posts"], () =>
    axios.get("/api/post").then((res) => res.data)
  );

  return (
    <div className="bg-black text-neutral-300 min-h-screen">
      <Head>
        <title>Reddit Clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="max-w-5xl mx-auto p-4 grid grid-cols-3 gap-4">
        <section className="flex flex-col gap-4 col-span-3 lg:col-span-2">
          <Feed postQuery={postQuery} />
        </section>
        <section>
          <HomeWidget />
        </section>
      </main>
    </div>
  );
};

export default Home;
