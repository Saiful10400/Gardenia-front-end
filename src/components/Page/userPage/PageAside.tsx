"use client";
import {  ArrowRightFromLine, ListCollapse } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import "./style.css";
const PageAside = () => {
  const path = usePathname();
  const list = (
    <>
      <Link
        className={`flex py-2 my-1 pl-3 rounded-md items-center gap-3 text-lg font-bold ${
          path === "/pages" && "pageActiveAside"
        }`}
        href={"/pages"}
      >
        <ListCollapse /> All pages
      </Link>
      <Link
        className={`flex py-2 my-1 pl-3 rounded-md items-center gap-3 text-lg font-bold ${
          path === "/pages/invitation" && "pageActiveAside"
        }`}
        href={"/pages/invitation"}
      >
        <ArrowRightFromLine /> Page invitation
      </Link>
    </>
  );

  return <ul className="w-full mt-3 border-t border-gray-600 px-1">{list}</ul>;
};

export default PageAside;
