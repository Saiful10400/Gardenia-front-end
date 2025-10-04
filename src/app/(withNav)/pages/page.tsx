"use client";
import { useGetAUserAllPageQuery } from "@/Redux/api/api";
import { useAppSelector } from "@/Redux/hoocks/Convaying";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface TuserPage {
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
}

const Page = () => {
  const { loggedInUser } = useAppSelector((e) => e.authStore);
  const { data } = useGetAUserAllPageQuery(loggedInUser._id);
  const pageData: TuserPage[] = data?.data;

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 p-4">
      {pageData?.map((item) => {
        const createdAt = new Date(item?.page?.createdAt).toLocaleDateString();
        return (
          <Link
            href={`/page?id=${item?.page?._id}`}
            key={item?.page?._id}
            data-aos="zoom-in"
            className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            {/* Cover Image */}
            <div className="relative">
              <Image
                height={300}
                width={400}
                className="w-full h-[120px] object-cover"
                alt="cover"
                src={item?.page?.coverImg}
              />
              {/* Logo Overlay */}
              <div className="absolute left-1/2 -bottom-10 transform -translate-x-1/2">
                <Image
                  height={100}
                  width={100}
                  className="w-[80px] h-[80px] rounded-full object-cover border-4 border-white shadow-md group-hover:scale-105 transition-transform duration-300"
                  alt="logo"
                  src={item?.page?.logo}
                />
              </div>
            </div>

            {/* Content */}
            <section className="flex flex-col items-center mt-12 px-4 pb-4">
              <h1 className="font-bold text-lg text-gray-800 group-hover:text-green-600 transition-colors duration-300">
                {item?.page?.name}
              </h1>
         
              <p className="text-xs text-gray-400 mt-1">Created: {createdAt}</p>
            </section>
          </Link>
        );
      })}
    </div>
  );
};

export default Page;
