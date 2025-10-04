"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";
import { MdEmail, MdModeEditOutline } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";

const Bio = ({ userData, isYou, followerData, updateProfile, id }) => {
  // ✅ Bio update
  const [updateBio, setUpdateBio] = useState(false);
  const [bioLoading, setBioLoading] = useState(false);

  const bioHandle = (e: any) => {
    e?.preventDefault();
    const bio = e?.target?.bio?.value;
    setBioLoading(true);
    updateProfile({ id, bio }).then((res: any) => {
      if (res?.data?.statusCode === 200) {
        setUpdateBio(false);
        setBioLoading(false);
      }
    });
  };

  return (
    <div data-aos="fade-down" className="lg:w-[40%] lg:sticky top-[-80px] space-y-5">
      {/* ---------- BIO / INTRO ---------- */}
      <div className="w-full bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Intro</h1>

        {updateBio ? (
          <form onSubmit={bioHandle} className="space-y-3">
            <textarea
              name="bio"
              defaultValue={userData?.bio || ""}
              className="w-full min-h-[150px] border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700 resize-none"
              placeholder="Write something about yourself..."
            ></textarea>

            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setUpdateBio(false)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all duration-200"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={bioLoading}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200"
              >
                <MdModeEditOutline className="text-xl" />
                {bioLoading ? "Updating..." : "Update Bio"}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <h2 className="text-lg font-medium text-gray-700 mb-2">Bio</h2>
            <p className="text-gray-600 italic">
              {userData?.bio || "No bio added yet."}
            </p>
            {isYou && (
              <button
                onClick={() => setUpdateBio(true)}
                className="w-full mt-4 bg-green-600 text-white font-semibold py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-green-700 transition-all duration-300"
              >
                <MdModeEditOutline className="text-xl" />
                {userData?.bio ? "Edit Bio" : "Add Bio"}
              </button>
            )}
          </div>
        )}

        {/* ---------- DETAILS ---------- */}
        <hr className="my-5 border-gray-200" />
        <section className="flex flex-col gap-3 text-gray-700">
          {userData?.educationInstitute && (
            <div className="flex items-center gap-3">
              <PiStudentBold className="text-2xl text-green-500" />
              <p className="font-medium">
                Studied at{" "}
                <span className="font-semibold text-gray-800">
                  {userData?.educationInstitute}
                </span>
              </p>
            </div>
          )}

          {userData?.address && (
            <div className="flex items-center gap-3">
              <IoHomeSharp className="text-2xl text-green-500" />
              <p className="font-medium">
                Lives in{" "}
                <span className="font-semibold text-gray-800">{userData?.address}</span>
              </p>
            </div>
          )}

          <div className="flex items-center gap-3">
            <MdEmail className="text-2xl text-green-500" />
            <p className="font-medium break-all">{userData?.email}</p>
          </div>

          {userData?.phone && (
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-xl text-green-500" />
              <p className="font-medium">{userData?.phone}</p>
            </div>
          )}

          {isYou && (
            <div className="flex gap-3 mt-4">
              <button
                onClick={() =>
                  document?.getElementById("Update_modal")?.showModal()
                }
                className="flex-1 bg-green-600 text-white font-semibold py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-green-700 transition-all duration-300"
              >
                <MdModeEditOutline className="text-xl" />
                Edit Details
              </button>

          
            </div>
          )}
        </section>
      </div>

      {/* ---------- FOLLOWERS ---------- */}
      <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold text-gray-800">Followers</h2>
          {followerData?.data?.followers?.length > 0 && (
            <button
              onClick={() =>
                document?.getElementById("Followers_modal")?.showModal()
              }
              className="text-green-600 text-sm font-medium hover:underline"
            >
              See all
            </button>
          )}
        </div>

        {followerData?.data?.followers?.length > 0 ? (
          <div className="grid grid-cols-3 gap-3">
            {followerData?.data?.followers
              ?.slice(-9)
              ?.map((item: any) => (
                <Link
                  key={item?._id}
                  href={`/profile?id=${item?.follower?._id}`}
                  className="group"
                >
                  <div className="relative aspect-square overflow-hidden rounded-lg">
                    <Image
                      src={item?.follower?.img || "/default-avatar.png"}
                      alt="follower"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
              ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-3">No followers yet</p>
        )}
      </div>

      {/* ---------- FOLLOWING ---------- */}
      <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold text-gray-800">Following</h2>
          {followerData?.data?.following?.length > 0 && (
            <button
              onClick={() =>
                document?.getElementById("Following_modal")?.showModal()
              }
              className="text-green-600 text-sm font-medium hover:underline"
            >
              See all
            </button>
          )}
        </div>

        {followerData?.data?.following?.length > 0 ? (
          <div className="grid grid-cols-3 gap-3">
            {followerData?.data?.following
              ?.slice(-9)
              ?.map((item: any) => (
                <Link
                  key={item?._id}
                  href={`/profile?id=${item?.following?._id}`}
                  className="group"
                >
                  <div className="relative aspect-square overflow-hidden rounded-lg">
                    <Image
                      src={item?.following?.img || "/default-avatar.png"}
                      alt="following"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
              ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-3">No following yet</p>
        )}
      </div>
    </div>
  );
};

export default Bio;
