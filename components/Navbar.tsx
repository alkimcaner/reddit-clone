import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { AiFillHome, AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsBookmark } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import useClickOutside from "../hooks/useClickOutside";
import { useRouter } from "next/router";
import axios from "axios";
import { CommunityType } from "../types/community";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const menuRef = useClickOutside(() => setIsCommunityMenuOpen(false));
  const [isCommunityMenuOpen, setIsCommunityMenuOpen] = useState(false);
  const [communityList, setCommunityList] = useState<CommunityType[]>([]);

  useEffect(() => {
    const handleGetCommunityList = async () => {
      try {
        const response = await axios.get("/api/community");
        setCommunityList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    handleGetCommunityList();
  }, []);

  return (
    <nav className="sticky top-0 z-50 h-12 bg-neutral-900 text-neutral-300 flex gap-4 items-center px-4 border-b border-neutral-700">
      {/* Home */}
      <Link href="/">
        <a className="flex gap-2 items-center cursor-pointer">
          <div className="h-8 w-8 relative">
            <Image src={"/assets/redditLogo.png"} alt="" layout="fill" />
          </div>
          <div className="h-4 w-[3.25rem] relative hidden md:inline">
            <Image src={"/assets/redditLogoText.png"} alt="" layout="fill" />
          </div>
        </a>
      </Link>
      {/* Communities */}
      <div className="mr-auto lg:mr-0 select-none">
        <div
          ref={menuRef}
          onClick={() => setIsCommunityMenuOpen((prev) => !prev)}
          className="md:w-64 flex gap-2 items-center p-1 rounded-sm ring-neutral-700 hover:ring-1 cursor-pointer"
        >
          <AiFillHome className="text-2xl" />
          <span className="text-sm hidden md:inline">
            {router.query.community ? (
              <span>r/{router.query.community}</span>
            ) : (
              <span>Home</span>
            )}
          </span>
          <MdKeyboardArrowDown className="ml-auto" />
        </div>
        {isCommunityMenuOpen && (
          <div className="absolute overflow-hidden bg-neutral-900 border border-neutral-700 rounded-md mt-1 w-64 text-sm flex flex-col justify-center cursor-pointer">
            <span className="py-2 px-4 text-[.6rem] text-neutral-500 font-bold">
              YOUR COMMUNITIES
            </span>
            {session && (
              <Link href="/create-community">
                <a className="py-2 px-4 flex gap-2 items-center hover:bg-neutral-800">
                  <AiOutlinePlus />
                  Create Community
                </a>
              </Link>
            )}
            {communityList.map((community) => (
              <Link key={community._id} href={`/r/${community.name}`}>
                <a className="py-2 px-4 hover:bg-neutral-800">
                  {community.name}
                </a>
              </Link>
            ))}
          </div>
        )}
      </div>
      {/* Search */}
      <div className="group focus-within:ring-neutral-200 mr-auto px-4 py-2 hidden lg:flex gap-2 bg-neutral-800 text-neutral-500 rounded-full ring-1 ring-neutral-700 w-[48rem]">
        <AiOutlineSearch className="text-2xl" />
        <input
          className="bg-transparent outline-none text-neutral-200 placeholder-neutral-500 text-sm w-full"
          placeholder="Search Reddit"
        />
      </div>
      {/* Menu */}
      {session && (
        <div className="flex gap-1 items-center text-xl">
          <div className="p-2 rounded-sm cursor-pointer hover:bg-neutral-800">
            <BsBookmark />
          </div>
          <Link href="/create-post">
            <a className="p-2 rounded-sm cursor-pointer hover:bg-neutral-800">
              <AiOutlinePlus />
            </a>
          </Link>
        </div>
      )}
      {/* Profile */}
      {session ? (
        <div
          onClick={() => signOut()}
          className="min-w-max flex gap-2 items-center px-1 rounded-sm ring-neutral-700 hover:ring-1 cursor-pointer select-none"
        >
          <div className="w-8 h-8 relative rounded-full overflow-hidden">
            <Image
              src={session.user?.image || "/assets/redditLogo.png"}
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="hidden md:block min-w-max">
            <p className="text-sm">{session.user?.name}</p>
            <p className="text-xs text-neutral-400">0 karma</p>
          </div>
          <BiLogOut className="text-neutral-400 text-xl md:ml-4" />
        </div>
      ) : (
        <div
          onClick={() => signIn("google")}
          className="min-w-max flex gap-2 items-center px-8 py-1 rounded-full ring-blue-700 ring-1 cursor-pointer select-none hover:bg-blue-700"
        >
          <p className="flex gap-1 items-center">
            Sign in with <FcGoogle />
          </p>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
