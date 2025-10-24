"use client";

import { useAppSelector } from "@/Redux/hoocks/Convaying";
import Image from "next/image";
import Link from "next/link";
import friendsIcon from "../../../assets/home/icon/friends.png";
import pageIcon from "../../../assets/home/icon/pages.png";
import wishListIcon from "../../../assets/home/icon/wishlist.png";
import HomepageTittles from "@/components/ui/HomepageTittles";
import { useAUserAllFollowingPagesQuery } from "@/Redux/api/api";

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

const LeftAside = () => {
  const { loggedInUser } = useAppSelector((e) => e.authStore);
  const { data, isLoading } = useAUserAllFollowingPagesQuery(loggedInUser?._id);
  const followingPages: tUserPage[] = data?.data;

  const navItems = [
    { name: "Profile", href: `/profile?id=${loggedInUser._id}`, icon: loggedInUser?.img },
    { name: "Friends", href: "/friends", icon: friendsIcon },
    { name: "Pages", href: "/pages", icon: pageIcon },
    { name: "Wishlist", href: "/wishlist", icon: wishListIcon },
  ];

  const skeletonArray = Array.from({ length: 5 });

  return (
    <div className="w-[18%] mt-5 hidden pl-2 lg:block h-[calc(100vh-100px)] sticky top-[92px] overflow-y-auto">
      <div className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-200 hover:scale-105 transition-all duration-200"
          >
            <div className="w-10 h-10 relative flex-shrink-0">
              {item.name === "Profile" && !item.icon ? (
                <div className="w-full h-full rounded-full bg-gray-300 animate-pulse" />
              ) : (
                <Image
                  src={item.icon}
                  width={40}
                  height={40}
                  alt={item.name}
                  className={`rounded-full object-cover ${item.name === "Profile" ? "shadow-md" : ""}`}
                />
              )}
            </div>
            <span className="text-base font-medium text-gray-800">{item.name}</span>
          </Link>
        ))}
      </div>

      {/* Following Pages */}
      <div className="mt-6">
        <HomepageTittles text="Following Pages" />
        <div className="flex flex-col gap-2 mt-2">
          {isLoading
            ? skeletonArray.map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl animate-pulse"
                >
                  <div className="w-10 h-10 bg-gray-300 rounded-md" />
                  <div className="h-4 w-24 bg-gray-300 rounded" />
                </div>
              ))
            : followingPages?.length
            ? followingPages.map((item) => (
                <Link
                  key={item._id}
                  href={`/page?id=${item?.page?._id}`}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-200 hover:scale-105 transition-all duration-200"
                >
                  <Image
                    src={item?.page?.logo}
                    width={40}
                    height={40}
                    alt={item?.page?.name}
                    className="rounded-md object-cover shadow-sm"
                  />
                  <span className="text-gray-800 font-medium">{item?.page?.name}</span>
                </Link>
              ))
            : <p className="text-gray-400 px-3 py-2 text-sm">No pages followed yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default LeftAside;
