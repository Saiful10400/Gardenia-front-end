"use client";

import HomepageTittles from "@/components/ui/HomepageTittles";
import {
  useAllFriendRequestQuery,
  useModifyFrindRequestMutation,
} from "@/Redux/api/api";
import { useAppSelector } from "@/Redux/hoocks/Convaying";
import { TfriendRequestAccept } from "@/Types";
import { socket } from "@/Wsocket";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ActiveFriends from "./ActiveFriends";

const RightAsiide = () => {
  const [frindRequests, setFriendRequests] = useState([]);
  const { loggedInUser } = useAppSelector((e) => e.authStore);
  const { data } = useAllFriendRequestQuery(loggedInUser?._id);

  useEffect(() => {
    if (data?.statusCode === 200) {
      setFriendRequests(data?.data);
    }
  }, [data]);

  socket.on("frindRequest", (data) => {
    setFriendRequests(data);
  });

  const [modifyRequest] = useModifyFrindRequestMutation();

  const modifyRequestHandle = (id: string, action: "accept" | "reject") => {
    modifyRequest({
      status: action,
      sender: id,
      receiver: loggedInUser?._id,
    });
  };

  return (
    <div className="  2xl:w-[18%] xl:w-[20%]  hidden lg:block h-[40vh] sticky top-[92px]">
      {/* friend request. */}

      <HomepageTittles text="Friend requests" />
      {frindRequests.length === 0 ? (
        <h1 className="text-center my-20 text-sm">No friend request</h1>
      ) : (
        <div className="mt-3 pb-5 border-b flex-col flex gap-1">
          {frindRequests?.map((item: TfriendRequestAccept) => (
            <div
              key={item._id}
              className="flex gap-2 hover:bg-gray-200 p-2 duration-300 rounded-md"
            >
              <Image
                src={item.sender.img}
                alt="userProfileImage"
                width={70}
                height={70}
                className="rounded-full md:w-[60px] md:h-[60px] object-cover"
              />

              <div>
                <h1 className="text-lg font-medium">{item.sender.name}</h1>

                <div className="flex items-center gap-5 mt-2">
                  <button
                    onClick={() =>
                      modifyRequestHandle(item?.sender?._id, "accept")
                    }
                    className="text-base font-semibold bg-[#25a82b] text-white px-4 py-1 rounded-md"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() =>
                      modifyRequestHandle(item?.sender?._id, "reject")
                    }
                    className="text-base font-semibold bg-[#e2e5e9]  px-4 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ActiveFriends />
    </div>
  );
};

export default RightAsiide;
