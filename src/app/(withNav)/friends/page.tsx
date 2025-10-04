"use client";
import { useAllFriendRefQuery } from "@/Redux/api/api";
import { useAppSelector } from "@/Redux/hoocks/Convaying";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BadgeCheck, Briefcase, GraduationCap, MapPin, Users } from "lucide-react";
 


export type Tfriend = {
  _id: string;
  name: string;
  img: string;
  email: string;
  password: string;
  phone: string;
  role: "user" | "admin" | string; // Adjust or narrow down roles as needed
  coverImg: string;
  bio: string;
  profession: string | null;
  educationInstitute: string;
  address: string;
  verifyed: boolean;
  socialLinks: string[]; // Assuming URLs or social handles; change type if needed
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
  isBlocked: boolean;
};


const Friends = () => {
  const { loggedInUser } = useAppSelector((s) => s.authStore);
  const { data: allFrind } = useAllFriendRefQuery(loggedInUser?._id);

  // Filter friends properly
  const allFriends =
    allFrind?.data
      ?.map((item:{sender:Tfriend,receiver:Tfriend}) => {
        if (item.sender?._id !== loggedInUser?._id) return item.sender;
        if (item.receiver?._id !== loggedInUser?._id) return item.receiver;
        return null;
      })
      ?.filter(Boolean) || [];

  // ✅ Empty state
  if (allFriends.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-24">
        <div className="bg-green-100 rounded-full p-6 mb-4">
          <Users size={48} className="text-green-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          You have no friends yet
        </h2>
        <p className="text-gray-500 max-w-sm">
          Start connecting with people to grow your network.  
          When you add friends, they’ll appear here.
        </p>
      </div>
    );
  }


 

  // ✅ Main UI
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-5 p-4">
 {allFriends.map((friend: Tfriend) => (
  <Link
    key={friend._id}
    href={`/profile?id=${friend._id}`}
    className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-green-100 hover:border-green-300"
  >
    {/* Cover image */}
    <div className="relative">
      <Image
        className="w-full h-[180px] object-cover transition-transform duration-300 group-hover:scale-105"
        alt={friend.name}
        src={friend.img}
        width={300}
        height={180}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>

    {/* Info */}
    <div className="py-3 px-4 flex flex-col items-center text-center">
      <h1 className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition-colors flex items-center gap-1">
        {friend.name}
        {friend.verifyed && <BadgeCheck className="w-4 h-4 text-green-500" />}
      </h1>
      <p className="text-sm text-gray-500 mb-1">Friend</p>

      {/* Profession or Education */}
      {friend.profession ? (
        <div className="flex items-center text-sm text-gray-600 gap-1">
          <Briefcase className="w-4 h-4" />
          <span className="truncate max-w-[150px]">{friend.profession}</span>
        </div>
      ) : (
        <div className="flex items-center text-sm text-gray-600 gap-1">
          <GraduationCap className="w-4 h-4" />
          <span className="truncate max-w-[150px]">{friend.educationInstitute}</span>
        </div>
      )}

      {/* Address */}
      <div className="flex items-center text-sm text-gray-600 gap-1 mt-1">
        <MapPin className="w-4 h-4" />
        <span className="truncate max-w-[150px]">{friend.address}</span>
      </div>
    </div>
  </Link>
))}
    </div>
  );
};

export default Friends;
