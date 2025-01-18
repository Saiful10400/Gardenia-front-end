"use client";
import { ListCollapseIcon, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import "./style.css";
const WishlistAsideNav = () => {
  const path = usePathname();
  const list = (
    <>
      <Link
        className={`flex py-2 my-1 pl-3 rounded-md items-center gap-3 text-lg font-bold ${
          path === "/wishlist" && "wishlistActiveAside"
        }`}
        href={"/wishlist"}
      >
        <ListCollapseIcon />
        All
      </Link>
    </>
  );

  return <ul className="w-full pt-10 px-1">{list}</ul>;
};

export default WishlistAsideNav;
