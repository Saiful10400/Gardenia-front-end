"use client";

import {
  setUser,
} from "@/Redux/featcher/AuthSlice";
import { useAppDispatch, useAppSelector } from "@/Redux/hoocks/Convaying";
import {
  CircleUser,
  DollarSign,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  RectangleEllipsis,
  RssIcon,
  StickyNoteIcon,
  User,
  User2,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const DashboardNav = () => {
  const { loggedInUser } = useAppSelector((e) => e.authStore);
  const path = usePathname();
  const dispatch = useAppDispatch();

  const isUser = path.includes("/user-dashboard");

  const logoutHandle = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
  };

  const adminLinks = [
    { href: "/admin-dashboard", label: "Dashboard", icon: <LayoutDashboard /> },
    { href: "/admin-dashboard/contents", label: "Contents", icon: <RssIcon /> },
    { href: "/admin-dashboard/users", label: "Users", icon: <User /> },
    { href: "/admin-dashboard/payments", label: "Payments", icon: <DollarSign /> },
  ];

  const userLinks = [
    { href: "/user-dashboard/posts", label: "Posts", icon: <StickyNoteIcon /> },
    { href: "/user-dashboard/followers", label: "Followers", icon: <Users /> },
    { href: "/user-dashboard/followings", label: "Followings", icon: <User /> },
    {
      href: "/user-dashboard/change-password",
      label: "Change Password",
      icon: <RectangleEllipsis />,
    },
  ];

  const links = isUser ? userLinks : adminLinks;

  const activeClass =
    "bg-[#f4cb0d] text-[#121121] shadow-md font-semibold rounded-lg";

  const dropDownItems = (
    <>
      {loggedInUser && (
        <li>
          <Link
            href={"/"}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md transition"
          >
            <Home size={18} /> Home
          </Link>
        </li>
      )}
      {loggedInUser?.role === "admin" && (
        <li>
          <Link
            href={`/profile?id=${loggedInUser?._id}`}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md transition"
          >
            <User2 size={18} /> Profile
          </Link>
        </li>
      )}
      {loggedInUser ? (
        <li>
          <button
            onClick={logoutHandle}
            className="flex w-full items-center gap-2 p-2 hover:bg-red-50 text-red-600 rounded-md transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </li>
      ) : (
        <li>
          <Link
            href={"/login"}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md transition"
          >
            <User size={18} /> Login
          </Link>
        </li>
      )}
    </>
  );

  return (
    <nav className="flex justify-between items-center h-16 px-6 lg:px-10  bg-white shadow-sm sticky top-0 z-50">
      {/* Mobile Menu */}
      <details className="dropdown lg:hidden">
        <summary className="btn btn-ghost p-2">
          <Menu size={22} />
        </summary>
        <ul className="menu dropdown-content bg-white rounded-box shadow-md w-56 p-2 mt-2">
          {links.map(({ href, label, icon }) => {
            const isActive = path === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 py-2 pl-3 text-base transition-all hover:bg-gray-100 rounded-lg ${
                    isActive ? activeClass : "text-gray-600"
                  }`}
                >
                  {icon}
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </details>

      {/* Dashboard Title */}
      <Link
        href={"/"}
        className="font-bold text-lg lg:text-2xl text-[#121121] tracking-wide"
      >
        {isUser ? "User Dashboard" : "Admin Dashboard"}
      </Link>

      {/* Right Side Profile Dropdown */}
      <div className="flex items-center gap-4">
        <details className="dropdown dropdown-end">
          <summary className="btn bg-transparent shadow-none border-none hover:bg-transparent">
            {loggedInUser ? (
              <Image
                height={40}
                width={40}
                alt="userProfile"
                src={loggedInUser?.img}
                className="w-10 h-10 rounded-full object-cover border-2 border-[#f4cb0d]"
              />
            ) : (
              <CircleUser size={35} className="text-gray-500" />
            )}
          </summary>
          <ul className="menu dropdown-content bg-white rounded-xl shadow-lg w-56 p-2 right-0 mt-2">
            {dropDownItems}
          </ul>
        </details>
      </div>
    </nav>
  );
};

export default DashboardNav;
