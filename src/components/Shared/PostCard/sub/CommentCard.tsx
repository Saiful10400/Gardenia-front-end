"use client";
import { Ellipsis, SendHorizonal } from "lucide-react";
import Image from "next/image";
import React from "react";

const CommentCard = ({ item }) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Image
          height={50}
          width={50}
          alt="user-image"
          src={item?.commentor?.img}
          className="w-[50px] h-[50px] rounded-full"
        />
        <h1 className="font-semibold">{item?.commentor?.name}</h1>
        <button>
          <Ellipsis />
        </button>
      </div>

<form className="bg-gray-200 w-[50%] relative ml-[50px] p-1 rounded-lg font-medium">
    <textarea className="bg-transparent w-full resize-none pl-1 pt-1 " defaultValue={item.comment}></textarea>
    <button className="absolute bottom-2 text-gray-600 right-2"><SendHorizonal size={16}/></button>
</form>


    </div>
  );
};

export default CommentCard;
