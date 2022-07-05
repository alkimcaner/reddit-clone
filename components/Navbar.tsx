import React from "react";
import Image from "next/image";
import Link from "next/link";
import redditLogo from "../assets/redditLogo.png";
import redditLogoText from "../assets/redditLogoText.png";
import { AiFillHome, AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { BsChatDots } from "react-icons/bs";

const Navbar = () => {
  return (
    <nav className="sticky h-12 bg-neutral-900 text-white flex gap-4 items-center px-4">
      {/* Home */}
      <Link href="/">
        <div className="flex gap-2 items-center cursor-pointer">
          <div className="h-8 w-8 relative">
            <Image src={redditLogo} alt="" layout="fill" />
          </div>
          <div className="h-4 w-14 relative hidden md:inline">
            <Image src={redditLogoText} alt="" layout="fill" />
          </div>
        </div>
      </Link>
      {/* Communities */}
      <div className="flex gap-2 items-center p-1 rounded-sm ring-neutral-700 hover:ring-1 cursor-pointer select-none">
        <AiFillHome className="text-2xl" />
        <span className="text-sm hidden md:inline">Home</span>
        <MdKeyboardArrowDown className="md:ml-32" />
      </div>
      {/* Search */}
      <div className="px-4 py-1 hidden md:flex gap-2 bg-neutral-800 text-neutral-500 rounded-sm ring-1 ring-neutral-700 mx-auto flex-1">
        <AiOutlineSearch className="text-2xl" />
        <input
          className="bg-transparent outline-none text-white text-sm w-full"
          placeholder="Search Reddit"
        />
      </div>
      {/* Menu */}
      <div className="ml-auto flex gap-1 items-center text-xl">
        <div className="p-2 rounded-sm cursor-pointer hover:bg-neutral-800">
          <BsChatDots />
        </div>
        <div className="p-2 rounded-sm cursor-pointer hover:bg-neutral-800">
          <IoNotificationsOutline />
        </div>
        <div className="p-2 rounded-sm cursor-pointer hover:bg-neutral-800">
          <AiOutlinePlus />
        </div>
      </div>
      {/* Profile */}
      <div className="flex gap-2 items-center px-1 rounded-sm ring-neutral-700 hover:ring-1 cursor-pointer select-none">
        <div className=" w-8 h-8 relative rounded-full overflow-hidden">
          <Image
            src={"https://avatars.githubusercontent.com/u/17219339?v=4"}
            alt=""
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="hidden md:block">
          <p className="text-sm">flawn</p>
          <p className="text-xs text-neutral-400">999 karma</p>
        </div>
        <MdKeyboardArrowDown className="md:ml-16" />
      </div>
    </nav>
  );
};

export default Navbar;
