"use client"
import { UserPlusIcon, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import "./style.css"
const FriendsAsideNav = () => {

    const path=usePathname()
    const list=<>
    <Link className={`flex py-2 my-1 pl-3 rounded-md items-center gap-3 text-lg font-bold ${path==="/friends" && "frindActiveAside"}`} href={"/friends"}><Users/>Friends</Link>
    <Link className={`flex py-2 my-1 pl-3 rounded-md items-center gap-3 text-lg font-bold ${path==="/friends/friend-requests" && "frindActiveAside"}`} href={"/friends/friend-requests"}><UserPlusIcon/>Friend requests</Link>
    </>



    return (
        <ul className='w-full pt-10 px-1'>
        {list}
    </ul>
    );
};

export default FriendsAsideNav;