"use client";

import {
  Bell,
  ChartNoAxesGantt,
  DollarSign,
  LayoutDashboard,
  RectangleEllipsis,
  RssIcon,
  StickyNoteIcon,
  User,
  Users,
} from "lucide-react";
import { FaPhotoVideo } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AdminAside = () => {
  const path = usePathname();
  const isUser = path.includes("/user-dashboard");

  const adminLinks = [
    { href: "/admin-dashboard", label: "Dashboard", icon: <LayoutDashboard /> },
    { href: "/admin-dashboard/contents", label: "Contents", icon: <RssIcon /> },
    { href: "/admin-dashboard/users", label: "Users", icon: <User /> },
    { href: "/admin-dashboard/payments", label: "Payments", icon: <DollarSign /> },
    { href: "/admin-dashboard/notification", label: "Notification", icon: <Bell /> },
    { href: "/admin-dashboard/category", label: "Category", icon: <ChartNoAxesGantt /> },
    { href: "/admin-dashboard/story", label: "Story", icon: <FaPhotoVideo /> },
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

  const activeClass =
    "bg-[#147d3b] text-[white] font-semibold shadow-md rounded-xl";

  return (
    <aside className="w-full pt-10 px-3 text-gray-300">
      <ul className="flex flex-col gap-1">
        {(isUser ? userLinks : adminLinks).map(({ href, label, icon }) => {
          const isActive = path === href;
          return (
            <li key={href}>
              <Link
                href={href}
                className={`flex items-center gap-3 py-2.5 pl-4 text-base font-medium rounded-xl transition-all duration-300 
                  hover:bg-[#147d3b] hover:text-[white] hover:translate-x-1 
                  ${isActive ? activeClass : "text-gray-400"}`}
              >
                <span className="text-xl">{icon}</span>
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default AdminAside;
