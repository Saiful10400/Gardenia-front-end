"use client"

import FollowingCard from "@/components/WithoutNav/User-dashboard/FollowingCard/FollowingCard";
import { useGetFollowerAndFollowingQuery } from "@/Redux/api/api";
import { useAppSelector } from "@/Redux/hoocks/Convaying";

const Followings = () => {

    
    const { loggedInUser } = useAppSelector(
        (e) => e.authStore
      );
    const { data } =useGetFollowerAndFollowingQuery(loggedInUser?._id);
 
    return (
        <div>
            
<div className="grid grid-cols-2 gap-4 lg:grid-cols-6">

{data?.data?.following?.map((item,idx)=><FollowingCard key={idx} data={item}/>)}

</div>

        </div>
    );
};

export default Followings;