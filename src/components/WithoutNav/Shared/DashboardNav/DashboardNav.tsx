"use client"

import { useAppSelector } from '@/Redux/hoocks/Convaying';
import { Bell } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const DashboardNav = () => {

    const { loggedInUser, isLoading: currentLoading } = useAppSelector(
        (e) => e.authStore
      );
console.log(loggedInUser)


    return (
        <div className='flex justify-between h-full px-6 pr-16 items-center '>
           <h1 className='font-bold text-3xl text-green-700'>Admin Dashboard</h1>
           <div className='flex items-center gap-4'>
            <button><Bell/></button>
            <button disabled>
                <Image height={100} width={100} alt='userProfile' src={loggedInUser?.img} className='w-[40px] h-[40px] rounded-full object-cover'/>
            </button>
           </div>
        </div>
    );
};

export default DashboardNav;