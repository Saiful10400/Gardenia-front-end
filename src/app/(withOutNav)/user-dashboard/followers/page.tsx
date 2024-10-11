"use client"

import FollowersCard from '@/components/WithoutNav/User-dashboard/FollowersCard/FollowersCard';
import { useGetFollowerAndFollowingQuery } from '@/Redux/api/api';
import { useAppSelector } from '@/Redux/hoocks/Convaying';
import React from 'react';

const Followers = () => {

    const { loggedInUser } = useAppSelector(
        (e) => e.authStore
      );
    const { data } =useGetFollowerAndFollowingQuery(loggedInUser?._id);

    return (
        <div>
            
<div className="grid grid-cols-2 gap-4 lg:grid-cols-6">

{data?.data?.followers?.map((item,idx)=><FollowersCard key={idx} data={item}/>)}

</div>

        </div>
    );
};

export default Followers;