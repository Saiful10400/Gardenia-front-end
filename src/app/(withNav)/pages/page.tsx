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
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    __v: number;
  };
  role: string;
  accept: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

const Page = () => {
  const { loggedInUser } = useAppSelector((e) => e.authStore);
  const { data } = useGetAUserAllPageQuery(loggedInUser._id);
  const pageData: TuserPage[] = data?.data;
 
  return (
    <div className="grid lg:grid-cols-7 grid-cols-1 gap-4">
      {pageData?.map((item) => {
   
        return (
          <Link href={`/page?id=${item?.page?._id}`}
            key={item?.page?._id}
            data-aos="zoom-in"
            className="bg-white pb-5 rounded-lg overflow-hidden"
          >
            <Image
              height={300}
              width={400}
              className="w-full h-[100px] object-cover"
              alt="cover"
              src={item?.page?.coverImg}
            />

            <section className="flex flex-col h-[140px] items-center justify-center relative bottom-8">
              <Image
                height={300}
                width={400}
                className="w-[100px]  h-[100px] rounded-full object-cover"
                alt="cover"
                src={item?.page?.logo}
              />
              <div className="">
                <h1 className="font-bold text-xl inline-block">
                  {item?.page?.name}
                </h1>
              </div>
            </section>
          </Link>
        );
      })}
    </div>
  );
};

export default Page;
