"use client";
import {
  useGetAUserAllPageInvitationQuery,
  useResponseInviteMutation,
} from "@/Redux/api/api";
import { useAppSelector } from "@/Redux/hoocks/Convaying";
import Image from "next/image";
import React from "react";

type Tinvitation = {
  _id: string;
  user: string;
  page: {
    _id: string;
    admin: string;
    logo: string;
    coverImg: string;
    isRead: boolean;
    name: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  role: string;
  accept: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const Invitation = () => {
  const { loggedInUser } = useAppSelector((e) => e.authStore);
  const { data } = useGetAUserAllPageInvitationQuery(loggedInUser._id);
  const invitation: Tinvitation[] = data?.data;

  const [modifyInvitationSend] = useResponseInviteMutation();
  const modifyInvitation = (id: string, status: boolean) => {
    modifyInvitationSend({ id, status });
  };

  if (!invitation || invitation.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20">
        {/* <Image
          src="/empty-invitation.svg" // 👉 put your own illustration or icon here
          alt="No invitations"
          width={180}
          height={180}
          className="mb-6 opacity-80"
        /> */}
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          No Invitations Yet
        </h2>
        <p className="text-gray-500 max-w-md">
          You don’t have any page invitations at the moment.  
          When someone invites you to manage or join their page, you’ll see it here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 p-4">
      {invitation?.map((item: Tinvitation) => (
        <div
          key={item._id}
          className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
        >
          {/* Cover + Logo */}
          <div className="relative">
            <Image
              src={item.page.coverImg}
              alt="page cover"
              width={400}
              height={200}
              className="w-full h-[120px] object-cover"
            />
            <div className="absolute left-1/2 -bottom-10 transform -translate-x-1/2">
              <Image
                src={item.page.logo}
                alt="page logo"
                width={80}
                height={80}
                className="w-[80px] h-[80px] rounded-full object-cover border-4 border-white shadow-md group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Info */}
          <div className="mt-12 px-4 pb-5 flex flex-col items-center text-center">
            <h1 className="font-bold text-lg text-gray-800 group-hover:text-green-600 transition-colors duration-300">
              {item.page.name}
            </h1>
            <p className="text-sm text-gray-500">
              Role: <span className="font-medium">{item.role}</span>
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 px-4 pb-4">
            <button
              onClick={() => modifyInvitation(item._id, true)}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition-colors duration-300"
            >
              ✅ Accept
            </button>
            <button
              onClick={() => modifyInvitation(item._id, false)}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-md transition-colors duration-300"
            >
              ❌ Decline
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Invitation;
