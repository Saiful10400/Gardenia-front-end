"use client";

import {
  useAllFriendRequestQuery,
  useModifyFrindRequestMutation,
} from "@/Redux/api/api";
import { useAppSelector } from "@/Redux/hoocks/Convaying";
import { TfriendRequestAccept } from "@/Types";
import { socket } from "@/Wsocket";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BadgeCheck, Briefcase, GraduationCap, MapPin } from "lucide-react";
import { PiUserPlusLight } from "react-icons/pi";

const FriendRequests = () => {
  const [frindRequests, setFriendRequests] = useState<TfriendRequestAccept[]>(
    []
  );
  const { loggedInUser } = useAppSelector((e) => e.authStore);
  const { data } = useAllFriendRequestQuery(loggedInUser?._id);
  const [modifyRequest] = useModifyFrindRequestMutation();

  useEffect(() => {
    if (data?.statusCode === 200) {
      setFriendRequests(data?.data);
    }
  }, [data]);

  // Setup socket event
  useEffect(() => {
    socket.on("frindRequest", (data) => {
      setFriendRequests(data);
    });

    return () => {
      socket.off("frindRequest");
    };
  }, []);

  const modifyRequestHandle = (id: string, action: "accept" | "reject") => {
    modifyRequest({
      status: action,
      sender: id,
      receiver: loggedInUser?._id,
    });
  };
  if (frindRequests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-500">
         <div className="bg-green-100 rounded-full p-6 mb-4">
          <PiUserPlusLight size={48} className="text-green-600" />
        </div>
        <h1 className="text-center text-base">
          No friend requests at the moment
        </h1>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {frindRequests.map((item) => (
        <div
          key={item._id}
          className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-all"
        >
          {/* Image */}
          <Image
            src={item.sender.img}
            alt="User profile"
            width={300}
            height={200}
            className="w-full h-[200px] object-cover"
          />

          {/* Info */}
          <div className="p-4 text-center">
            <h1 className="text-lg font-semibold text-gray-800 flex justify-center items-center gap-1">
              {item.sender.name}
              {item.sender.verifyed && (
                <BadgeCheck className="w-4 h-4 text-green-500" />
              )}
            </h1>

            {/* Profession or Education */}
            <p className="text-sm text-gray-600 mt-1 flex justify-center items-center gap-1">
              {item.sender.profession ? (
                <>
                  <Briefcase className="w-4 h-4" />
                  {item.sender.profession}
                </>
              ) : (
                <>
                  <GraduationCap className="w-4 h-4" />
                  {item.sender.educationInstitute}
                </>
              )}
            </p>

            {/* Address */}
            <p className="text-xs text-gray-500 mt-1 flex justify-center items-center gap-1">
              <MapPin className="w-4 h-4" />
              {item.sender.address}
            </p>

            {/* Buttons */}
            <div className="flex flex-col mt-4 gap-2">
              <button
                onClick={() =>
                  modifyRequestHandle(item?.sender?._id, "accept")
                }
                className="w-full bg-green-600 text-white font-medium py-2 rounded-md hover:bg-green-700 transition-all"
              >
                Confirm
              </button>
              <button
                onClick={() =>
                  modifyRequestHandle(item?.sender?._id, "reject")
                }
                className="w-full bg-gray-200 text-gray-700 font-medium py-2 rounded-md hover:bg-gray-300 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendRequests;
