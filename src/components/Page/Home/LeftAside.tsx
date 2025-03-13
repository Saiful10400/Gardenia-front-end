"use client";

type Page = {
  _id: string;
  admin: string;
  logo: string;
  coverImg: string;
  isRead: boolean;
  name: string;
  privacy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  description: string;
};

type tUserPage = {
  _id: string;
  user: string;
  page: Page;
  role: string;
  accept: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

import { useAppSelector } from "@/Redux/hoocks/Convaying";
import Image from "next/image";
import Link from "next/link";
import friendsIcon from "../../../assets/home/icon/friends.png";
import pageIcon from "../../../assets/home/icon/pages.png";
import wishListIcon from "../../../assets/home/icon/wishlist.png";
import HomepageTittles from "@/components/ui/HomepageTittles";
import { useAUserAllFollowingPagesQuery } from "@/Redux/api/api";

const LeftAside = () => {
  const { loggedInUser } = useAppSelector((e) => e.authStore);

  //all following pages.
  const { data } = useAUserAllFollowingPagesQuery(loggedInUser?._id);
  const followingPages: tUserPage[] = data?.data;

  return (
    <>
      <div className="w-[18%] mt-5 hidden pl-2 lg:block h-[40vh] sticky top-[92px]">
        <div>
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

        <div className="mt-3">
          <HomepageTittles text="Following Pages" />

          {/* user following pages. */}

          <div>
            {followingPages?.map((item: tUserPage) => {
              return (
                <Link className="flex items-center gap-4 hover:bg-gray-300 py-2 pl-2 rounded-md" key={item._id} href={`/page?id=${item?.page?._id}`}>
                  <Image className="rounded-md w-[40px] h-[40px] object-cover" src={item?.page?.logo} width={40} height={40} alt="page images."/>
                  <h1>{item?.page?.name}</h1>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftAside;
