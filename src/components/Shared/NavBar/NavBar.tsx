"use client";

import Image from "next/image";
import logo from "../../../assets/nav/logo.png";
import Link from "next/link";
import Tocenter from "@/components/Helper/Tocenter";
import { usePathname } from "next/navigation";
import { Bell, CircleUser, CircleUserRound, GalleryHorizontal, ImageIcon, LayoutDashboard, LogOut, Menu, Newspaper, UsersRound } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/Redux/hoocks/Convaying";
import "./style.css";
import { setUser } from "@/Redux/featcher/AuthSlice";
import Notification from "@/components/ui/Notification";
import useGetAllNotification from "@/utils/useGetAllNotification";
import { Tnotification } from "@/components/ui/SingleNotificationCard";
import { useState } from "react";
import { useMakeNotificationReadMutation } from "@/Redux/api/api";
const NavBar = () => {
  const path = usePathname();

  const { loggedInUser } = useAppSelector((e) => e.authStore);

  const routes = (
    <>
      <Link
        className={` py-2 px-5  gap-3 lg:text-lg border-b-[3px] border-transparent lg:font-bold  ${
          path === "/" && "navActive"
        }`}
        href={"/"}
      >
        <Newspaper width={30} height={30}/>
      </Link>

      {loggedInUser?._id && (
        <Link
          className={` py-2 px-5  gap-3 lg:text-lg border-b-[3px] border-transparent lg:font-bold   ${
            path === "/profile" && "navActive"
          }`}
          href={`/profile?id=${loggedInUser?._id}`}
        >
         <CircleUserRound width={30} height={30}/>
        </Link>
      )}

      {loggedInUser?._id && (
        <Link
          className={` py-2 px-5  gap-3 lg:text-lg border-b-[3px] border-transparent lg:font-bold   ${
            path === "/friends" && "navActive"
          }`}
          href={`/friends`}
        >
         <UsersRound width={30} height={30}/>
        </Link>
      )}

      <Link
        className={` py-2 px-5  gap-3 lg:text-lg border-b-[3px] border-transparent lg:font-bold   ${
          path === "/galary" && "navActive"
        }`}
        href={"/galary"}
      >
        <ImageIcon width={30} height={30}/>
      </Link>

      {/* <Link
        className={` py-2 px-5  gap-3 lg:text-lg border-b-[3px] border-transparent lg:font-bold   ${
          path === "/about-us" && "navActive"
        }`}
        href={"/about-us"}
      >
        About Us
      </Link>

      <Link
        className={` py-2 px-5  gap-3 lg:text-lg border-b-[3px] border-transparent lg:font-bold   ${
          path === "/contact-us" && "navActive"
        }`}
        href={"/contact-us"}
      >
        Contact Us
      </Link> */}
    </>
  );

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
        {loggedInUser ? (
          <button onClick={logoutHandle}><LogOut/> Logout</button>
        ) : (
          <Link href={"/login"}>Login</Link>
        )}
        {/* {loggedInUser && <Link href={"/user-dashboard/posts"}>Dashboard</Link>} */}
        {loggedInUser?.role === "admin" && (
          <Link href={"/admin-dashboard"}><LayoutDashboard/>Dashboard</Link>
        )}
      </li>
    </>
  );

  const [showNotification, setShowNotification] = useState(false);
  const notification: Tnotification[] = useGetAllNotification();
  const unreadNotification = notification?.filter(
    (item) => item.isRead === false
  );

  const[send]=useMakeNotificationReadMutation()
  const notificationReadHandle=()=>{
    if(!loggedInUser?._id || unreadNotification.length===0) return
    send(loggedInUser?._id)
  }

  return (
    <>
      {/* fro desktop view. */}
      <div className="bg-transparent sticky top-0 bg-white z-30 text-black py-2  shadow-md">
        <Tocenter>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <details className="dropdown block lg:hidden">
                <summary className="btn bg-transparent shadow-none border-none hover:bg-transparent m-1">
                  <Menu />
                </summary>
                <ul className="menu  dropdown-content left-[10px] bg-base-100 rounded-box z-[1] w-52 p-2 font-semibold shadow">
                  {routes}
                </ul>
              </details>

              <Link href={"/"}>
                <Image alt="Logo" width={50} height={400} src={logo}></Image>
              </Link>
            </div>

            <ul className="lg:flex hidden  gap-4 text-lg font-semibold">
              {routes}
            </ul>

            <div className=" flex items-center gap-3 relative">
              <div className="relative">
                {unreadNotification&&unreadNotification?.length !== 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-400 p-1 rounded-full w-[20px] h-[20px] flex justify-center items-center font-semibold text-sm text-white">
                    {unreadNotification?.length}
                  </span>
                )}
                <button onClick={() =>{
                   setShowNotification((p) => !p)
                   notificationReadHandle()
                }}>
                  <Bell size={30} />{" "}
                </button>
              </div>
              {showNotification && (
                <div className="absolute top-full right-0 w-[310px]">
                  <Notification />
                </div>
              )}

              <details className="dropdown">
                <summary className="btn bg-transparent shadow-none border-none hover:bg-transparent m-1">
                  {loggedInUser ? (
                    <Image
                      height={50}
                      className="rounded-full w-[40px] h-[40px] object-cover"
                      width={50}
                      src={loggedInUser?.img}
                      alt="profileimg"
                    />
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
        </Tocenter>
      </div>
    </>
  );
};

export default NavBar;
