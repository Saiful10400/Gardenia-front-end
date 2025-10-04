"use client"
import Button from '@/components/Component/Button/Button';
import { useUnfollowOneMutation } from '@/Redux/api/api';
import { useAppSelector } from '@/Redux/hoocks/Convaying';
import Image from 'next/image';
import React from 'react';

const FollowingCard = ({data}) => {

    const { loggedInUser } = useAppSelector(
        (e) => e.authStore
      );

    const[unfollow]=useUnfollowOneMutation()


    const unfollowHandle=()=>{
        if(loggedInUser?._id && data?.following?._id){
            unfollow({
                follower: loggedInUser?._id,
                following: data?.following?._id,
              })
        }
    }
  
    return (
        <div data-aos="zoom-in" className='pb-2 bg-white shadow-2xl rounded-3xl overflow-hidden'>
            <Image
              src={data?.following?.img}
              alt="postImage"
              width={300}
              height={300}
              className="w-full h-[200px] object-cover object-top"
            />
            <h1 className='font-bold text-lg text-center my-3'>{data?.following?.name}</h1>

            <div className='text-center'>
            <Button onClick={unfollowHandle} className='rounded-sm px-3 font-medium' text='Unfollow'/>
            </div>
        </div>
    );
};

export default FollowingCard;