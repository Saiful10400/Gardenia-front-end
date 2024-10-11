"use client"

import { DollarSign, LayoutDashboard, RssIcon, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import "./style.css"

const AdminAside = () => {

    const path=usePathname()

    const list=<>
    <Link className={`flex py-2 pl-3 items-center gap-3 text-lg font-bold ${path==="/admin-dashboard" && "active"}`} href={"/admin-dashboard"}><LayoutDashboard/>Dashboard</Link>
    <Link className={`flex py-2 my-1 pl-3 items-center gap-3 text-lg font-bold ${path==="/admin-dashboard/contents" && "active"}`} href={"/admin-dashboard/contents"}><RssIcon/>Contents</Link>
    <Link className={`flex py-2 my-1 pl-3 items-center gap-3 text-lg font-bold ${path==="/admin-dashboard/users" && "active"}`} href={"/admin-dashboard/users"}><User/>Users</Link>
    <Link className={`flex py-2 my-1 pl-3 items-center gap-3 text-lg font-bold ${path==="/admin-dashboard/payments" && "active"}`} href={"/admin-dashboard/payments"}><DollarSign/>Payments</Link>
    </>



    return (
        <ul className='w-full pt-10'>
            {list}
        </ul>
    );
};

export default AdminAside;