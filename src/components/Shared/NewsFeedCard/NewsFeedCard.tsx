"use client";

import PostCard from "../PostCard/PostCard";

const NewsFeedCard = ({ data }) => {
  console.log(data, "db newses.");



  return (
    <div>
      <h1 className="lg:text-3xl text-xl font-bold">Latest Post</h1>

      <div className="lg:mt-10">
        {data?.map((item, idx) => (
          <PostCard data={item} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default NewsFeedCard;
