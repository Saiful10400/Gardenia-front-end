"use client";

import PostCard from "../PostCard/PostCard";

const NewsFeedCard = ({ data }) => {
  return (
    <div>
      <div className="flex flex-col gap-4">
        {data?.map((item, idx:number) => (
          <PostCard data={item} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default NewsFeedCard;
