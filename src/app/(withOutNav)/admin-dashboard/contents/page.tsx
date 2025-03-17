"use client";

import Loading from "@/components/Shared/Loading/Loading";
import { TtableData } from "@/Types";
import DashboardTable from "../../../../components/ui/DashboardTable";

const Content = () => {
 



  const tableData: TtableData = {
    name: "Content",
    tittle: "Users Posts",
    createRoute: " ",
    keyValue: {
      Image: "img",
      "Group Post": "isGroupPost",
      "Total Vote":"vote",
      "Post Blocked":"isBlock",
      "Post Created":"createdAt"
       
    },
  };




  return  <DashboardTable data={tableData}/>

 
};

export default Content;
