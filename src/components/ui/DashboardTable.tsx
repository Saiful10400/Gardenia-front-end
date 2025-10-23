"use client";

import { TtableData } from "../../Types";
import formateDate from "@/utils/formateDate";
import Image from "next/image";
import {
  useAdminPanalAllNotificationQuery,
  useAllPaymentHistoryQuery,
  useGetAllCategoryQuery,
  useGetAllMusicQuery,
  useGetPostQuery,
} from "@/Redux/api/api";

const DashboardTable = ({ data }: { data: TtableData }) => {
  const headers = Object.keys(data.keyValue);
  const keys = Object.values(data.keyValue);

  let fetchedData;

  if (data.name === "Content") fetchedData = useGetPostQuery(null);
  if (data.name === "payments") fetchedData = useAllPaymentHistoryQuery(null);
  if (data.name === "category") fetchedData = useGetAllCategoryQuery(null);
  if (data.name === "notification")
    fetchedData = useAdminPanalAllNotificationQuery(null);
  if (data.name === "story") fetchedData = useGetAllMusicQuery(null);

  const typeFormate = (key: string, item: any) => {
    if (
      key === "logo" ||
      key === "image" ||
      key === "img" ||
      key === "userPhoto" ||
      key === "musicArt"
    ) {
      return (
        <td key={key} className="py-3 pl-5">
          <div className="flex items-center">
            <Image
              height={50}
              width={50}
              src={item[key]}
              alt="photo"
              className="w-[50px] h-[50px] rounded-md object-cover border border-gray-200 shadow-sm"
            />
          </div>
        </td>
      );
    } else if (
      key === "isGroupPost" ||
      key === "isBlock" ||
      key === "isDeleted" ||
      key === "isRead"
    ) {
      const val = item[key];
      return (
        <td key={key} className="py-3 pl-5 font-medium">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              val
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {val ? "Yes" : "No"}
          </span>
        </td>
      );
    } else if (key === "updated" || key === "created" || key === "createdAt") {
      return (
        <td key={key} className="py-3 pl-5 text-gray-600 text-sm">
          {formateDate(item[key])}
        </td>
      );
    } else {
      return (
        <td key={key} className="py-3 pl-5 text-gray-700 font-medium">
          {item[key] ?? "-"}
        </td>
      );
    }
  };

  let FetchedData: any[] = [];
  if (data.name === "Content") {
    FetchedData = fetchedData?.data?.data?.map((item) => item.post);
  } else {
    FetchedData = fetchedData?.data?.data || [];
  }

  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      data-aos="fade-up"
    >
      {/* Header Section */}
      <div className="flex justify-between items-center border-b px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100">
        <h1 className="text-lg font-semibold text-gray-800">
          {data.tittle}
        </h1>
        {/* optional: add a small refresh or search */}
        {/* <button className="text-sm text-blue-600 font-medium hover:underline">
          Refresh
        </button> */}
      </div>

      {/* Table Wrapper */}
      <div className="overflow-x-auto  scrollbar-thin scrollbar-thumb-gray-300">
        <table className="w-full border-collapse text-left">
          <thead className="sticky top-0 bg-gray-100 text-gray-700 text-sm uppercase tracking-wide shadow-sm">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="py-3 px-5 font-semibold border-b border-gray-200"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-sm animate-fadeIn">
            {FetchedData?.length > 0 ? (
              FetchedData.map((item: any, index: number) => (
                <tr
                  key={index}
                  className={`transition-all duration-200 hover:bg-gray-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  }`}
                >
                  {keys.map((key) => typeFormate(key, item))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={headers.length}
                  className="py-10 text-center text-gray-500 font-medium"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Optional Footer */}
      {/* <div className="px-6 py-3 border-t text-sm text-gray-500">
        Showing {FetchedData?.length || 0} entries
      </div> */}
    </div>
  );
};

export default DashboardTable;
