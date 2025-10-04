"use client"

import UserPostCard from "@/components/Component/Dashboard/User-dashboard/UserPostCard/UserPostCard";
import { useGetAuserAllPostQuery } from "@/Redux/api/api";
import { useAppSelector } from "@/Redux/hoocks/Convaying";

const Posts = () => {

    const { loggedInUser } = useAppSelector(
        (e) => e.authStore
      );

    const{data:aUserPosts}=useGetAuserAllPostQuery(loggedInUser?._id)

    

    return (
        <div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {aUserPosts?.data?.all?.map((item,idx)=><UserPostCard key={idx} data={item}/>)}
            </div>
        </div>
    );
};

export default Posts;