"use client";

import useGetAllNotification from "@/utils/helperComponent/useGetAllNotification";
import SingleNotificationCard, { Tnotification } from "./SingleNotificationCard";
import { Bell } from "lucide-react";
import React from "react";

const Notification = () => {
  const notifications = useGetAllNotification();

  return (
    <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-md  pl-2 py-2 flex flex-col gap-3 min-h-[400px] max-h-[600px] overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-green-100 pb-2 mb-2">
        <div className="flex items-center gap-2">
          {/* <Bell className="text-green-600" size={20} /> */}
          <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
          {/* {notifications?.length > 0 && (
            <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
              {notifications.length}
            </span>
          )} */}
        </div>

        {/* Mark all as read button (UI only for now) */}
        {/* {notifications?.length > 0 && (
          <button className="flex items-center gap-1 text-sm text-green-700 hover:text-green-800 font-medium transition-colors">
            <CheckCircle2 size={16} />
            Mark all as read
          </button>
        )} */}
      </div>

      {/* Notifications List */}
      <div className="flex flex-col gap-2 overflow-y-auto  scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-green-100">
        {notifications && notifications?.length > 0 ? (
          notifications.map((item: Tnotification) => (
            <SingleNotificationCard key={item._id} notification={item} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-gray-500 py-10">
            <Bell className="text-green-400 mb-2" size={32} />
            <p className="text-sm font-medium">You have no new notifications</p>
            <p className="text-xs text-gray-400 mt-1">
              Stay tuned! New updates will appear here.
            </p>
          </div>
        )}
      </div>

      {/* Bottom gradient fade (subtle UX detail) */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
};

export default Notification;
