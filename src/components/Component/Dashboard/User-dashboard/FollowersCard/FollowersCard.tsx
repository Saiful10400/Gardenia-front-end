"use client"

import Button from '@/components/Component/Button/Button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const FollowersCard = ({data}) => {
   
    return (
        <div data-aos="zoom-in" className='pb-2 bg-white shadow-2xl rounded-3xl overflow-hidden'>
        <Image
          src={data?.follower?.img}
          alt="postImage"
          width={300}
          height={300}
          className="w-full h-[200px] object-cover object-top"
        />
        <h1 className='font-bold text-lg text-center my-3'>{data?.follower?.name}</h1>

        <div className='text-center'>
        <Link href={`/profile?id=${data?.follower?._id}`}><Button className='rounded-sm px-3 font-medium' text='See Profile'/></Link>
        </div>
    </div>
    );
};

export default FollowersCard;