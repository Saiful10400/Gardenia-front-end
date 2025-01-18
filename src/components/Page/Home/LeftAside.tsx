"use client";

import { useAppSelector } from "@/Redux/hoocks/Convaying";
import Image from "next/image";
import Link from "next/link";
import friendsIcon from "../../../assets/home/icon/friends.png"
import pageIcon from "../../../assets/home/icon/pages.png"
import wishListIcon from "../../../assets/home/icon/wishlist.png"

const LeftAside = () => {
  const { loggedInUser } = useAppSelector((e) => e.authStore);
  return (
    <div className="w-[18%] mt-5 hidden pl-2 lg:block h-[40vh] sticky top-[92px]">
      <Link
        className="text-lg px-2 py-2 duration-300 font-semibold rounded-md hover:bg-gray-300 flex items-center gap-3"
        href={`/profile?id=${loggedInUser._id}`}
      >
        <div className="w-[40px] h-[40px] relative">
          <Image
            className="rounded-full w-full h-full"
            src={loggedInUser?.img}
            height={50}
            width={50}
            alt="user image"
          />
        </div>
        <h1 className="text-base">{loggedInUser?.name}</h1>
      </Link>
      <Link
        className="text-lg px-2 py-2 duration-300 font-semibold rounded-md hover:bg-gray-300 flex items-center gap-3"
        href={`/friends`}
      >
        <div className="w-[40px] h-[40px] relative">
          <Image
            className=" w-full h-full"
            src={friendsIcon}
            height={50}
            width={50}
            alt="user image"
          />
        </div>
        <h1 className="text-base">Friends</h1>
      </Link>
     
      <Link
        className="text-lg px-2 py-2 duration-300 font-semibold rounded-md hover:bg-gray-300 flex items-center gap-3"
        href={`/pages`}
      >
        <div className="w-[40px] h-[40px] relative">
          <Image
            className=" w-full h-full"
            src={pageIcon}
            height={50}
            width={50}
            alt="user image"
          />
        </div>
        <h1 className="text-base">Pages</h1>
      </Link>

      <Link
        className="text-lg px-2 py-2 duration-300 font-semibold rounded-md hover:bg-gray-300 flex items-center gap-3"
        href={`/wishlist`}
      >
        <div className="w-[40px] h-[40px] relative">
          <Image
            className=" w-full h-full"
            src={wishListIcon}
            height={50}
            width={50}
            alt="user image"
          />
        </div>
        <h1 className="text-base">Wishlist</h1>
      </Link>

    </div>
  );
};

export default LeftAside;
