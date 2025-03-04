"use client";

import Story from "@/components/Page/Home/Story";
import PostCard from "../PostCard/PostCard";

const NewsFeedCard = ({ data }:{data:{[key:string]:string}[]}) => {
  return (
    <div>
      <Story/>
      <div className="flex flex-col gap-4">
        {data?.map((item:{[key:string]:string}, idx:number) => (
          <PostCard data={item} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default NewsFeedCard;
