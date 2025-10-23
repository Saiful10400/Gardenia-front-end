import Image from "next/image";
import React from "react";
import bluticVarifyIcon from "../../../../../assets/profile/blueTick.png";
import Button from "@/components/Component/Button/Button";
import { useUpdateAUserMutation } from "@/Redux/api/api";
import defaultCoverImage from "../../../../../assets/dashboard/demoCover.jpg";

const DashboardUserDetailsCard = ({ data }) => {
  const [userUpdate] = useUpdateAUserMutation();

  const handleRole = () => {
    userUpdate({
      id: data?._id,
      role: data?.role === "user" ? "admin" : "user",
    });
  };

  const blockingHandle = () => {
    userUpdate({
      id: data?._id,
      isBlocked: data?.isBlocked ? false : true,
    });
  };

  return (
    <div
      data-aos="fade-up"
      className="flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
    >
      {/* LEFT SIDE - Modern Cover + Profile Section */}
      <div className="relative w-full md:w-[35%] h-[200px] flex items-end justify-center md:justify-start p-6 bg-gradient-to-br from-[#121121] to-[#1e1e2f]">
        {/* Cover Image */}
        <Image
          src={data?.coverImg || defaultCoverImage}
          alt="cover"
          fill
          className="object-cover opacity-70 absolute inset-0"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

        {/* Profile Picture */}
        <div className="relative z-10 flex flex-col items-center md:items-start">
          <div className="relative">
            <div className="p-[3px] bg-gradient-to-tr from-[#f4cb0d] to-[#121121] rounded-full">
              <Image
                src={data?.img || defaultCoverImage}
                alt="profile"
                height={90}
                width={90}
                className="w-[85px] h-[85px] rounded-full object-cover border-2 border-white shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Verified Badge */}
            {data?.verifyed && (
              <Image
                src={bluticVarifyIcon}
                alt="verified"
                height={26}
                width={26}
                className="absolute bottom-0 right-0 w-[26px] h-[26px]"
              />
            )}
          </div>

          {/* Name + Email (in cover area) */}
          <div className="text-white mt-3 md:mt-4 text-center md:text-left">
            <h2 className="text-lg font-semibold">{data?.name}</h2>
            <p className="text-gray-200 text-sm">{data?.email}</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - User Info & Actions */}
      <div className="flex flex-col w-full md:w-[65%] px-6 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              {data?.name}
            </h1>
            <p className="text-gray-500 text-sm">{data?.email}</p>
          </div>

          <div className="mt-4 md:mt-0 flex gap-3">
            <Button
              onClick={handleRole}
              className="rounded-md px-4 py-2 bg-[#121121] text-white font-semibold hover:bg-[#1a1a2b] transition-all duration-200"
              text={data?.role === "user" ? "Make Admin" : "Make User"}
            />
            <Button
              onClick={blockingHandle}
              className={`rounded-md px-4 py-2 font-semibold transition-all duration-200 ${
                data?.isBlocked
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
              text={data?.isBlocked ? "Unblock" : "Block"}
            />
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4 border-gray-200" />

        {/* Info Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Role</span>
            <span
              className={`font-semibold ${
                data?.role === "admin" ? "text-blue-600" : "text-gray-800"
              }`}
            >
              {data?.role}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Status</span>
            <span
              className={`font-semibold ${
                data?.isBlocked ? "text-red-600" : "text-green-600"
              }`}
            >
              {data?.isBlocked ? "Blocked" : "Active"}
            </span>
          </div>

          {data?.address && (
            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Address</span>
              <span className="text-gray-700 font-semibold text-right">
                {data?.address}
              </span>
            </div>
          )}

          {data?.phone && (
            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Phone</span>
              <span className="text-gray-700 font-semibold">
                {data?.phone}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardUserDetailsCard;
