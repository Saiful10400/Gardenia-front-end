"use client"

import { Bell, ChartNoAxesGantt, DollarSign, LayoutDashboard, RectangleEllipsis, RssIcon, StickyNoteIcon, User, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import "./style.css"

const AdminAside = () => {

    const path=usePathname()


 const isuser= path.includes("/user-dashboard")



    const list=<>
    <Link className={`flex py-2 pl-3 items-center gap-3 text-lg font-bold ${path==="/admin-dashboard" && "active"}`} href={"/admin-dashboard"}><LayoutDashboard/>Dashboard</Link>
    <Link className={`flex py-2 my-1 pl-3 items-center gap-3 text-lg font-bold ${path==="/admin-dashboard/contents" && "active"}`} href={"/admin-dashboard/contents"}><RssIcon/>Contents</Link>
    <Link className={`flex py-2 my-1 pl-3 items-center gap-3 text-lg font-bold ${path==="/admin-dashboard/users" && "active"}`} href={"/admin-dashboard/users"}><User/>Users</Link>
    <Link className={`flex py-2 my-1 pl-3 items-center gap-3 text-lg font-bold ${path==="/admin-dashboard/payments" && "active"}`} href={"/admin-dashboard/payments"}><DollarSign/>Payments</Link>
    <Link className={`flex py-2 my-1 pl-3 items-center gap-3 text-lg font-bold ${path==="/admin-dashboard/notification" && "active"}`} href={"/admin-dashboard/notification"}><Bell/>Notification</Link>
    <Link className={`flex py-2 my-1 pl-3 items-center gap-3 text-lg font-bold ${path==="/admin-dashboard/category" && "active"}`} href={"/admin-dashboard/category"}><ChartNoAxesGantt/>Category</Link>
    </>

    const userlist=<>
    {/* <Link className={`flex py-2 pl-3 items-center gap-3 text-lg font-bold ${path==="/user-dashboard" && "active"}`} href={"/user-dashboard"}><LayoutDashboard/>Dashboard</Link> */}
    <Link className={`flex py-2 my-1 pl-3 items-center gap-3 text-lg font-bold ${path==="/user-dashboard/posts" && "active"}`} href={"/user-dashboard/posts"}><StickyNoteIcon/>Posts</Link>
    <Link className={`flex py-2 my-1 pl-3 items-center gap-3 text-lg font-bold ${path==="/user-dashboard/followers" && "active"}`} href={"/user-dashboard/followers"}><Users/>Followers</Link>
    <Link className={`flex py-2 my-1 pl-3 items-center gap-3 text-lg font-bold ${path==="/user-dashboard/followings" && "active"}`} href={"/user-dashboard/followings"}><User/>Followings</Link>
    <Link className={`flex py-2 my-1 pl-3 items-center gap-3 text-lg font-bold ${path==="/user-dashboard/change-password" && "active"}`} href={"/user-dashboard/change-password"}><RectangleEllipsis/>Change Password</Link>
    </>



    return (
        <ul className='w-full pt-10'>
            {isuser?userlist:list}
        </ul>
    );
};

export default AdminAside;