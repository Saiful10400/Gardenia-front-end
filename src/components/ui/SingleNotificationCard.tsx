"use-client";
import { useGetAUserQuery } from "@/Redux/api/api";
import timeDifference from "@/utils/getRemainingTime";
import { UserPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
export type Tnotification = {
  _id: string;
  for: string;
  by: string;
  type: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Tuser = {
  _id: string;
  name: string;
  img: string;
  email: string;
  password: string;
  phone: string;
  role: "admin" | "user" | "moderator"; // If role can only be these values, otherwise use `string`
  coverImg: string;
  bio: string;
  profession: string | null;
  educationInstitute: string;
  address: string;
  socialLinks: string[]; // If it's always an array of strings
  createdAt: string;
  updatedAt: string;
  __v: number;
  verifyed: boolean;
  isBlocked: boolean;
};

const SingleNotificationCard = ({
  notification,
}: {
  notification: Tnotification;
}) => {
  const { data } = useGetAUserQuery(notification.by);
  const user: Tuser = data?.data;

  if (user) {
    return (
      <Link className="flex justify-between items-center px-3" href={"/"}>
        <div className="flex items-center gap-3">
          <div className="  w-[50px] h-[50px] relative">
            <span className="bg-blue-400 text-white rounded-full p-1 absolute bottom-0 right-0">
              <UserPlus width={15} height={15} />
            </span>
            <Image
              alt="user-image"
              className="rounded-full w-full h-full object-cover"
              src={user.img}
              height={50}
              width={50}
            />
          </div>
          <h1>
            <span className="text-md font-bold">{notification.content}</span>{" "}
            <span className="block font-light text-gray-600">
              {timeDifference(notification.createdAt)} ago
            </span>{" "}
          </h1>
        </div>
        {!notification.isRead && (
          <span className="bg-[#25a82b] p-1 rounded-full"></span>
        )}
      </Link>
    );
  }
};

export default SingleNotificationCard;
