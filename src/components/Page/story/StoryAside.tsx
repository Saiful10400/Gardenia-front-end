"use client";
import { useGetAllMusicQuery } from "@/Redux/api/api";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const StoryAside = () => {
  const { data } = useGetAllMusicQuery(null);
  return (
    <div>
      <section className="flex gap-4 items-center">
        <Link className="text-lg" href={"/"}>
          <X />
        </Link>
        <h1 className="text-lg">Your story</h1>
      </section>

      {/* music section. */}
      <div>
        <h1>Music</h1>
        <section>
          {data?.data?.map((item) => {



            return (
              <div key={item._id} className="flex items-center gap-3">
                <Image
                  className="w-[50px] h-[50px] rounded-md border border-gray-300 p-1"
                  alt="music cover art"
                  height={100}
                  width={100}
                  src={item.musicArt}
                />
                <h1>{item.name}</h1>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default StoryAside;
