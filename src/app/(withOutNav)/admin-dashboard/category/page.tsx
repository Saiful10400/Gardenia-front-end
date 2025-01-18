"use client";
import {
  useDeleteACategoryMutation,
  useGetAllCategoryQuery,
} from "@/Redux/api/api";
import React from "react";

const Category = () => {
  const { data } = useGetAllCategoryQuery(null);
  const category: { _id: string; name: string }[] = data?.data;
  const [deleteCategory] = useDeleteACategoryMutation();
  const deleteCategoryHandle = (id: string) => {
    deleteCategory(id);
  };
  console.log(data);
  return (
    <div className=" grid grid-cols-4 gap-4">
      {category?.map((item) => {
        return (
          <div
            key={item._id}
            data-aos="zoom-in"
            className="bg-white shadow-xl p-3 rounded-lg"
          >
            <h1 className="text-base font-bold">
              Category name:{" "}
              <span className=" font-semibold text-sm">{item.name}</span>
            </h1>

            <div>
              <button
                onClick={() => deleteCategoryHandle(item._id)}
                className="bg-red-500 text-white px-2 py-1 rounded-md mt-2"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Category;
