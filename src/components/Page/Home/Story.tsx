"use client";

import { useAppSelector } from "@/Redux/hoocks/Convaying";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CreateStory from "./CreateStory";
import { useState } from "react";

const Story = () => {
  const { loggedInUser } = useAppSelector((e) => e.authStore);
  const[hidden,setHidden]=useState(true)
  return (
    <div>

<CreateStory hidden={hidden} />



      <div className="grid grid-cols-6 gap-3 mb-4">
      <button onClick={()=>{
        setHidden(false)
         document.body.style.overflow = "hidden"
      }} className="bg-white rounded-md overflow-hidden shadow-lg">
        <Image
          width={400}
          height={500}
          alt="Profile image"
          src={loggedInUser.img}
        />
        <div className="flex flex-col justify-center items-center">
          <div className="bg-[#25a82b] border-3 border-white relative -top-5 flex justify-center items-center w-[35px] h-[35px] rounded-full">
            <Plus className="text-[#fff]" />
          </div>
          <h1>Create story</h1>
        </div>
      </button>
    </div>
    </div>
  );
};

export default Story;
