"use client"

import { useAppSelector } from '@/Redux/hoocks/Convaying';
import { Bell, DollarSign, LayoutDashboard, Menu, RssIcon, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const DashboardNav = () => {

    const { loggedInUser, isLoading: currentLoading } = useAppSelector(
        (e) => e.authStore
      );

      const path=usePathname()

      const list=<>
      <Link className={`flex py-2 pl-3 items-center gap-3 text-lg font-bold ${path==="/admin-dashboard" && "active"}`} href={"/admin-dashboard"}><LayoutDashboard/>Dashboard</Link>
      <Link className={`flex py-2 my-1 pl-3 items-center gap-3 text-lg font-bold ${path==="/admin-dashboard/contents" && "active"}`} href={"/admin-dashboard/contents"}><RssIcon/>Contents</Link>
      <Link className={`flex py-2 my-1 pl-3 items-center gap-3 text-lg font-bold ${path==="/admin-dashboard/users" && "active"}`} href={"/admin-dashboard/users"}><User/>Users</Link>
      <Link className={`flex py-2 my-1 pl-3 items-center gap-3 text-lg font-bold ${path==="/admin-dashboard/payments" && "active"}`} href={"/admin-dashboard/payments"}><DollarSign/>Payments</Link>
      </>


    return (
        <div className='flex justify-between h-full px-6 pr-16 items-center '>


<details className="dropdown lg:hidden">
  <summary className="btn m-1"><Menu/></summary>
  <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    {list}
  </ul>
</details>




           <h1 className='font-bold text-lg lg:text-3xl text-green-700'>Admin Dashboard</h1>
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