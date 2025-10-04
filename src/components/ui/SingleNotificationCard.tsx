"use client";
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
  role: "admin" | "user" | "moderator";
  coverImg: string;
  bio: string;
  profession: string | null;
  educationInstitute: string;
  address: string;
  socialLinks: string[];
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

  if (!user) return null;

  return (
    <Link
      href={"/"}
      className={`group flex items-start gap-4 pt-2 pb-2 pl-2 rounded-2xl transition-all duration-200 shadow-sm ${
        notification.isRead
          ? "bg-white hover:bg-green-50 border border-green-100"
          : "bg-gradient-to-r from-green-50 to-white border border-green-200 shadow-md"
      }`}
    >
      {/* Avatar */}
      <div className="relative min-w-[40px] h-[40px]">
        <Image
          src={user.img}
          alt={user.name}
          className="rounded-full object-cover w-[40px] h-[40px] border-2 border-green-300"
          height={40}
          width={40}
        />
        <span className="bg-green-500 text-white rounded-full p-1 absolute bottom-0 right-0 shadow-md">
          <UserPlus width={14} height={14} />
        </span>
      </div>

      {/* Text Content */}
      <div className="flex flex-col flex-1">
        <span className="text-[12px] sm:text-[14px] font-semibold text-green-700">
          {user.name}
        </span>
        <p className="text-[8px] sm:text-[12px] text-gray-800 leading-snug">
          {notification.content}
        </p>
        <span className="text-xs text-gray-500 mt-1">
          {timeDifference(notification.createdAt)} ago
        </span>
      </div>

      {/* Unread Dot */}
      {!notification.isRead && (
        <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-sm mt-2" />
      )}
    </Link>
  );
};

export default SingleNotificationCard;
