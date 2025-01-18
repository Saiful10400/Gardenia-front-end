"use client"

import { setUser } from '@/Redux/featcher/AuthSlice';
import { useAppDispatch, useAppSelector } from '@/Redux/hoocks/Convaying';
import { CircleUser, DollarSign, Home, LayoutDashboard, LogOut, Menu, RectangleEllipsis, RssIcon, StickyNoteIcon, User, User2, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const DashboardNav = () => {

    const { loggedInUser } = useAppSelector(
        (e) => e.authStore
      );

      const path=usePathname()
      const isuser= path.includes("/user-dashboard")
      const list=<>
      <Link className={`flex py-2 pl-3 items-center gap-3 text-lg font-bold ${path==="/admin-dashboard" && "active"}`} href={"/admin-dashboard"}><LayoutDashboard/>Dashboard</Link>
      <Link className={`flex py-2 my-1 pl-3 items-center gap-3 text-lg font-bold ${path==="/admin-dashboard/contents" && "active"}`} href={"/admin-dashboard/contents"}><RssIcon/>Contents</Link>
      <Link className={`flex py-2 my-1 pl-3 items-center gap-3 text-lg font-bold ${path==="/admin-dashboard/users" && "active"}`} href={"/admin-dashboard/users"}><User/>Users</Link>
      <Link className={`flex py-2 my-1 pl-3 items-center gap-3 text-lg font-bold ${path==="/admin-dashboard/payments" && "active"}`} href={"/admin-dashboard/payments"}><DollarSign/>Payments</Link>
      </>

const userlist=<>
{/* <Link className={`flex py-2 pl-3 items-center gap-3 text-lg font-bold ${path==="/user-dashboard" && "active"}`} href={"/user-dashboard"}><LayoutDashboard/>Dashboard</Link> */}
<Link className={`flex py-2 my-1 pl-3 items-center gap-3 text-lg font-bold ${path==="/user-dashboard/posts" && "active"}`} href={"/user-dashboard/posts"}><StickyNoteIcon/>Posts</Link>
<Link className={`flex py-2 my-1 pl-3 items-center gap-3 text-lg font-bold ${path==="/user-dashboard/followers" && "active"}`} href={"/user-dashboard/followers"}><Users/>Followers</Link>
<Link className={`flex py-2 my-1 pl-3 items-center gap-3 text-lg font-bold ${path==="/user-dashboard/followings" && "active"}`} href={"/user-dashboard/followings"}><User/>Followings</Link>
<Link className={`flex py-2 my-1 pl-3 items-center gap-3 text-lg font-bold ${path==="/user-dashboard/change-password" && "active"}`} href={"/user-dashboard/change-password"}><RectangleEllipsis/>Change Password</Link>
</>
  const dispatch = useAppDispatch();
  const logoutHandle = () => {
    // clear local storage.
    localStorage.removeItem("token");
    // clear state.
    dispatch(setUser(null));
  };

const dropDeownLinks = (
    <>
      <li>
          {loggedInUser && <Link href={"/"}><Home/>Home</Link>}
          {loggedInUser?.role === "admin" && (
            <Link href={`/profile?id=${loggedInUser?._id}`}><User2/>Profile</Link>
          )}
        {loggedInUser ? (
          <button onClick={logoutHandle}><LogOut/>Logout</button>
        ) : (
          <Link href={"/login"}>Login</Link>
        )}
      </li>
    </>
  );


    return (
        <div className='flex justify-between h-full px-6 pr-16 items-center '>


<details className="dropdown lg:hidden">
  <summary className="btn m-1"><Menu/></summary>
  <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
  {isuser?userlist:list}
  </ul>
</details>




           <Link href={"/"} className='font-bold text-lg lg:text-3xl text-green-700'>{isuser?"User Dashboard":"Admin Dashboard"}</Link>
           <div className='flex items-center gap-4'>
            
         

            <details className="dropdown">
                <summary className="btn bg-transparent shadow-none border-none hover:bg-transparent m-1">
                  {loggedInUser ? (
                     <Image height={100} width={100} alt='userProfile' src={loggedInUser?.img} className='w-[40px] h-[40px] rounded-full object-cover'/>
                  ) : (
                    <CircleUser size={35} />
                  )}
                </summary>
                <ul className="menu  dropdown-content right-[10px] bg-base-100 rounded-box z-[1] w-52 p-2 font-semibold shadow">
                  {dropDeownLinks}
                </ul>
              </details>






           </div>
        </div>
    );
};

export default DashboardNav;