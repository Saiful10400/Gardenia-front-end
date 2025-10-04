"use client"
import FavouritePostCard from '@/components/Component/FavouritePostcard/FavouritePostCard';
import { useGetAuserAllPostQuery } from '@/Redux/api/api';
import { useAppSelector } from '@/Redux/hoocks/Convaying';
import React from 'react';

const All = () => {
    const { loggedInUser } = useAppSelector((e) => e.authStore);
      const { data: postData } =useGetAuserAllPostQuery(loggedInUser?._id);
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {postData?.data?.favourite?.map((item, idx) => (
          <FavouritePostCard
            data-aos="fade-up"
            key={idx}
            data={item}
          />
        ))}
      </div>
    );
};

export default All;