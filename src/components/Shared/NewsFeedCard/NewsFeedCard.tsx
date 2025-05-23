"use client";

import Story from "@/components/Page/Home/Story";
import PostCard from "../PostCard/PostCard";
import PostCreate from "../PostCreate/PostCreate";
import { useAppSelector } from "@/Redux/hoocks/Convaying";

const NewsFeedCard = ({ data }:{data:{[key:string]:string}[]}) => {

  const { loggedInUser } = useAppSelector(
    (e) => e.authStore
  );


  return (
    <div>
      <Story/>

      <PostCreate userData={loggedInUser} />

      <div className="flex flex-col gap-4 mt-4">
        {data?.map((item:{[key:string]:string}, idx:number) => (
          <PostCard data={item} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default NewsFeedCard;
