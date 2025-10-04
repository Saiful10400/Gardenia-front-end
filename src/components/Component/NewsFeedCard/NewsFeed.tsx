"use client";
 
import PostCard from "../PostCard/PostCard";
import PostCreate from "../PostCreate/PostCreate";
import { useAppSelector } from "@/Redux/hoocks/Convaying";
import { useNewsfeedPostQuery } from "@/Redux/api/api";
import SkeletonGeneRator from "@/utils/helperComponent/SkeletonGeneRator";
import PostSkeleton from "@/components/ui/skleton/PostSkeleton";

const NewsFeed = () => {

  const { loggedInUser } = useAppSelector(
    (e) => e.authStore
  );

  const { data, isLoading } = useNewsfeedPostQuery(null);
  return (
    <div>
      {/* <Story /> */}

      <PostCreate userData={loggedInUser} />

      <div className="flex flex-col gap-4 mt-4">

        {isLoading && <SkeletonGeneRator quantity={5} component={<PostSkeleton />} />}

        {!isLoading && data?.data?.map((item: { [key: string]: string }, idx: number) => (
          <PostCard data={item} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
