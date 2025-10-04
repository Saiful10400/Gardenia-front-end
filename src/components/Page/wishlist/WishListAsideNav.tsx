"use client";

import { ListCollapseIcon, Heart, Star, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import "./style.css";

const WishlistAsideNav = () => {
  const path = usePathname();

  const navItems = [
    { name: "All", href: "/wishlist", icon: <ListCollapseIcon /> },
    // { name: "Favorites", href: "/wishlist/favorites", icon: <Heart /> },
    // { name: "Top Rated", href: "/wishlist/top-rated", icon: <Star /> },
    // { name: "Purchased", href: "/wishlist/purchased", icon: <ShoppingBag /> },
  ];

  return (
    <ul className="w-full pt-10 px-2">
      {navItems.map((item) => {
        const isActive = path === item.href;
        return (
          <li key={item.name}>
            <Link
              href={item.href}
              className={`flex items-center gap-3 py-2.5 my-1 pl-3 rounded-md text-lg font-bold transition-all duration-200 ${
                isActive
                  ? "wishlistActiveAside bg-blue-50 text-gray-900 shadow-sm"
                  : "text-gray-700 hover:bg-gray-100 hover:text-black"
              }`}
            >
              <span
                className={`w-5 h-5 flex items-center justify-center ${
                  isActive ? "text-black" : "text-gray-500"
                }`}
              >
                {item.icon}
              </span>
              <span>{item.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default WishlistAsideNav;
