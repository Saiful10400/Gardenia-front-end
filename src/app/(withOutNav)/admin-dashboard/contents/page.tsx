"use client";

import Loading from "@/components/Shared/Loading/Loading";
import DashboardPostCard from "@/components/WithoutNav/Shared/DashboardPostCard/DashboardPostCard";
import { useGetPostQuery } from "@/Redux/api/api";

const Content = () => {
  // all post.
  const { data: AllPost, isLoading: postLoading } = useGetPostQuery(null);


  return postLoading ? <Loading /> : 
  <div className="grid grid-cols-5 gap-5">
{
    AllPost?.data.map(item=><DashboardPostCard key={item?.post?._id} data={item}/>)
}
  </div>;   
};

export default Content;
