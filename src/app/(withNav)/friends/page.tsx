"use client";
import { useAllFriendRefQuery } from "@/Redux/api/api";
import { useAppSelector } from "@/Redux/hoocks/Convaying";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Friends = () => {
  const { loggedInUser } = useAppSelector((s) => s.authStore);

  const { data: allFrind } = useAllFriendRefQuery(loggedInUser?._id);
  const allFriends = allFrind?.data?.map((item) => {
    if (item.sender?._id !== loggedInUser?._id) {
      return item.sender;
    } else if (item.receiver?._id !== loggedInUser?._id) {
      return item.receiver;
    }
  });

  return (
    <div className="grid grid-cols-2 lg:grid-cols-8 lg:gap-5 gap-3">
      {allFriends?.map((item) => {
        return (
          <Link
            key={item._id}
            href={`/profile?id=${item._id}`}
            className="rounded-b-md shadow-lg w-full pb-2  bg-white "
          >
            <Image
              className="rounded-t-md h-[200px] w-full object-cover block"
              alt="use image"
              src={item.img}
              width={200}
              height={200}
            />
            <h1 className="lg:text-lg text-base font-semibold text-center mt-4">{item.name}</h1>
          </Link>
        );
      })}
    </div>
  );
};

export default Friends;
