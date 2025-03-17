"use client";
import DashboardTable from "@/components/ui/DashboardTable";
 
import { TtableData } from "@/Types";
import React from "react";

const Category = () => {
 
  // const category: { _id: string; name: string }[] = data?.data;
  // const [deleteCategory] = useDeleteACategoryMutation();
  // const deleteCategoryHandle = (id: string) => {
  //   deleteCategory(id);
  // };

   const tableData: TtableData = {
      name: "category",
      tittle: "Post Categories",
      createRoute: " ",
      keyValue: {
        "Name": "name",
        "Deleted": "isDeleted",
        "Created":"createdAt"
         
      },
    };
 
  return  <DashboardTable data={tableData}/>
};

export default Category;
