"use client";

import HomepageTittles from "@/components/ui/HomepageTittles";
import {
  useAllFriendRequestQuery,
  useModifyFrindRequestMutation,
  usePeopleYouMayKnowQuery,
} from "@/Redux/api/api";
import { useAppSelector } from "@/Redux/hoocks/Convaying";
import { TfriendRequestAccept } from "@/Types";
import { socket } from "@/Wsocket";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ActiveFriends from "./ActiveFriends";
import Link from "next/link";

const RightAsiide = () => {
  const [friendRequests, setFriendRequests] = useState<TfriendRequestAccept[]>([]);
  const { loggedInUser } = useAppSelector((e) => e.authStore);

  const { data: requestsData, isLoading: isRequestsLoading } = useAllFriendRequestQuery(
    loggedInUser?._id
  );
  const { data: peopleYouMayKnowData, isLoading: isPeopleLoading } = usePeopleYouMayKnowQuery(
    loggedInUser?._id
  );

  useEffect(() => {
    if (requestsData?.statusCode === 200) {
      setFriendRequests(requestsData?.data);
    }
  }, [requestsData]);

  useEffect(() => {
    socket.on("frindRequest", (data) => {
      setFriendRequests(data);
    });
  }, []);

  const [modifyRequest] = useModifyFrindRequestMutation();
  const modifyRequestHandle = (id: string, action: "accept" | "reject") => {
    modifyRequest({
      status: action,
      sender: id,
      receiver: loggedInUser?._id,
    });
  };

  const skeletonArray = Array.from({ length: 5 });

  return (
    <div className="2xl:w-[18%] xl:w-[20%] hidden lg:block h-[100vh] overflow-y-auto sticky top-[92px] px-2">
      {/* Friend Requests */}
      {isRequestsLoading ? (
        <>
          <HomepageTittles text="Friend Requests" />
          <div className="mt-3 flex flex-col gap-3">
            {skeletonArray.map((_, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-2 rounded-md animate-pulse bg-gray-100"
              >
                <div className="w-12 h-12 rounded-full bg-gray-300" />
                <div className="flex-1">
                  <div className="h-4 w-32 bg-gray-300 rounded mb-2" />
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-gray-300 rounded" />
                    <div className="h-6 w-12 bg-gray-300 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : friendRequests.length > 0 ? (
        <>
          <HomepageTittles text="Friend Requests" />
          <div className="mt-3 flex flex-col gap-3">
            {friendRequests.map((item) => (
              <div
                key={item._id}
                className="flex gap-3 p-2 rounded-md hover:bg-gray-200 transition-all"
              >
                <Image
                  src={item.sender.img}
                  alt={item.sender.name}
                  width={50}
                  height={50}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h1 className="text-base font-medium">{item.sender.name}</h1>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => modifyRequestHandle(item.sender._id, "accept")}
                      className="px-4 py-1 rounded-md font-semibold bg-[#25a82b] text-white hover:bg-[#1e8a24] transition-all"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => modifyRequestHandle(item.sender._id, "reject")}
                      className="px-4 py-1 rounded-md font-semibold bg-gray-200 hover:bg-gray-300 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <HomepageTittles text="People You May Know" />
          <div className="mt-3 flex flex-col gap-3">
            {isPeopleLoading
              ? skeletonArray.map((_, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2 rounded-md animate-pulse bg-gray-100"
                  >
                    <div className="w-12 h-12 rounded-full bg-gray-300" />
                    <div className="h-4 w-32 bg-gray-300 rounded" />
                  </div>
                ))
              : peopleYouMayKnowData?.data?.map((item: { _id: string; img: string; name: string }) => (
                  <Link
                    href={"/profile?id=" + item._id}
                    key={item._id}
                    className="flex gap-3 items-center p-2 rounded-md hover:bg-gray-200 transition-all"
                  >
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <h1 className="text-base font-normal">{item.name}</h1>
                  </Link>
                ))}
          </div>
        </>
      )}

      {/* Active Friends */}
      <ActiveFriends />
    </div>
  );
};

export default RightAsiide;
