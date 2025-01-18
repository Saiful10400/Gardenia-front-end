"use client";
import HomepageTittles from "@/components/ui/HomepageTittles";
import { useAllFriendRefQuery } from "@/Redux/api/api";
import { useAppSelector } from "@/Redux/hoocks/Convaying";
import { socket } from "@/Wsocket";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ActiveFriends = () => {
  const { loggedInUser } = useAppSelector((s) => s.authStore);
  const [activeFriends, setActivefriends] = useState([]);

  useEffect(() => {
    socket.emit("activeFriend", loggedInUser?._id);
    socket.on("activeFrindList", (data) => setActivefriends(data));
  }, [loggedInUser?._id]);

  const [userId, setUserid] = useState(null);
  const { data: allFrind } = useAllFriendRefQuery(userId);
  useEffect(() => {
    setUserid(loggedInUser?._id);
  }, [loggedInUser?._id]);

  const allFriends = allFrind?.data?.map((item) => {
    if (item.sender?._id !== loggedInUser?._id) {
      return item.sender;
    } else if (item.receiver?._id !== loggedInUser?._id) {
      return item.receiver;
    }
  });

  const activeUserId = activeFriends?.map((item) => item._id);

  console.log(activeUserId);

  return (
    <div className="mt-3">
      <HomepageTittles text="Friends" />
      <div className="mt-3 flex flex-col gap-2">
        {allFriends?.map((item) => {
          const isActive=activeUserId?.includes(item._id)
          return (
            <Link
              key={item?._id}
              className="text-lg px-2 py-1 duration-300 font-semibold rounded-md hover:bg-gray-300 flex items-center gap-3"
              href={`/profile?id=${item._id}`}
            >
              <div className="w-[40px] h-[40px] relative">
                <Image
                  className="rounded-full w-full h-full"
                  src={item?.img}
                  height={50}
                  width={50}
                  alt="user image"
                />
                {
                  isActive&&<span className="w-[12px] h-[12px] rounded-full absolute bottom-[1px] right-[1px] border-2 bg-green-500"></span>
                }
              </div>
              <h1 className="text-base">{item?.name}</h1>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ActiveFriends;
