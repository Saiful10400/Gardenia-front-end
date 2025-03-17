"use client";
 
import DashboardTable from "@/components/ui/DashboardTable";
import {
  useAdminPanalAllNotificationQuery,
 
} from "@/Redux/api/api";
import { TtableData } from "@/Types";
 
import React from "react";

const Notification = () => {
 
  // const AllNotification: Tnotification[] = data?.data;

  // // delete notification handel.
  // const [deleteNotification] = useDeleteANotificationMutation();
  // const deleteNotificationHandle = (id: string) => {
  //   deleteNotification(id);


   const tableData: TtableData = {
      name: "notification",
      tittle: "All Notifications",
      createRoute: " ",
      keyValue: {
        "Type": "type",
        "Content": "content",
        "Viewed":"isRead",
        "Date":"createdAt"
         
      },
    };
 

  return (

      <DashboardTable data={tableData}/>






    // <div className=" grid grid-cols-4 gap-4">
    //   {AllNotification?.map((item: Tnotification) => {
    //     return (
    //       <div
    //         key={item._id}
    //         data-aos="zoom-in"
    //         className="bg-white shadow-xl p-3 rounded-lg"
    //       >
    //         <h1 className="text-base font-bold">
    //           Notification for:{" "}
    //           <span className=" font-semibold text-sm">{item.for.name}</span>
    //         </h1>
    //         <h1 className="text-base font-bold">
    //           Content:{" "}
    //           <span className=" font-semibold text-sm">{item.content}</span>
    //         </h1>
    //         <h1 className="text-base font-bold">
    //           Created:{" "}
    //           <span className=" font-semibold text-sm">
    //             {timeDifference(item.createdAt)} ago
    //           </span>
    //         </h1>

    //         <div>
    //           <button onClick={()=>deleteNotificationHandle(item._id)} className="bg-red-500 text-white px-2 py-1 rounded-md mt-2">
    //             Delete
    //           </button>
    //         </div>
    //       </div>
    //     );
    //   })}
    // </div>
  );
};

export default Notification;
