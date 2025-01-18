"use client"

import { useAllFriendRequestQuery, useModifyFrindRequestMutation } from "@/Redux/api/api";
import { useAppSelector } from "@/Redux/hoocks/Convaying";
import { TfriendRequestAccept } from "@/Types";
import { socket } from "@/Wsocket";
import Image from "next/image";
import { useEffect, useState } from "react";

const FriendRequests = () => {
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
    <div >
        {frindRequests.length === 0 ? (
              <h1 className="text-center my-20 text-sm">No friend request</h1>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-8 lg:gap-5 gap-3">
                {frindRequests?.map((item: TfriendRequestAccept) => (
                  <div
                    key={item._id}
                    className="rounded-b-md shadow-lg w-full pb-2  bg-white "
                  >
                    <Image
                      src={item.sender.img}
                      alt="userProfileImage"
                      width={200}
                      height={200}
                     className="rounded-t-md h-[200px] w-full object-cover block"
                    />
      
                    <div>
                      <h1 className="lg:text-lg text-base font-semibold text-center mt-4">{item.sender.name}</h1>
      
                      <div className="flex flex-col  items-center gap-2 mt-2 px-2">
                        <button
                          onClick={() =>
                            modifyRequestHandle(item?.sender?._id, "accept")
                          }
                          className="text-base w-full font-semibold bg-[#25a82b] text-white px-4 py-1 rounded-md"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() =>
                            modifyRequestHandle(item?.sender?._id, "reject")
                          }
                          className="text-base w-full font-semibold bg-[#e2e5e9]  px-4 py-1 rounded-md"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
    </div>
  );
};

export default FriendRequests;