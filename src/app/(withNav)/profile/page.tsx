"use client";

import Tocenter from "@/components/Helper/Tocenter";
import Loading from "@/components/Shared/Loading/Loading";
import { useGetAUserQuery } from "@/Redux/api/api";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";
import dummycover from "../../../assets/pages/profile/plainCover.jpeg";
import { FaCamera } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdModeEditOutline } from "react-icons/md";
import { IoHomeSharp } from "react-icons/io5";
import { PiStudentBold } from "react-icons/pi";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";


const Profile = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data, isLoading } = useGetAUserQuery(id);


  const userData=data?.data


  return isLoading ? (
    <Loading />
  ) : (
    <Tocenter>
      <div className="bg-gray-100">
        {/* top cover photo and profile photo. */}

        <div className="relative">
          <Image
            src={dummycover}
            alt="coverPhoto"
            className="w-full rounded-lg h-[40vh]"
            height={300}
            width={1900}
          ></Image>
          <div className="absolute bottom-[20px] right-[10px]">
            <label
              htmlFor="coverUpdate"
              className="text-xl bg-gray-200 cursor-pointer  p-2 rounded-lg flex gap-3 items-center"
            >
              <FaCamera />
              <span className="text-base font-semibold">Add cover Photo</span>
            </label>
            <input id="coverUpdate" hidden type="file" />
          </div>
        </div>

        {/* profile section. */}

        <div className="flex flex-col lg:flex-row items-center lg:pb-0 pb-4 bg-white justify-between ">
          <div className="flex items-center justify-end gap-5 lg:gap-14">
            <div className="lg:w-[174px] w-[130px] bg-white p-2 relative lg:left-11 -top-[30px] rounded-full lg:h-[174px] h-[130px]">
              <Image
                src={data?.data?.img}
                alt="coverPhoto"
                className="w-full rounded-full object-cover h-full"
                height={170}
                width={170}
              ></Image>
              <div className="absolute bottom-[20px] right-[4px]">
                <label
                  htmlFor="ImgUpdate"
                  className="text-2xl bg-gray-200 cursor-pointer  p-2 block rounded-full"
                >
                  <FaCamera />
                </label>
                <input id="ImgUpdate" hidden type="file" />
              </div>
            </div>
            <div className=" ">
              <h1 className="text-4xl font-bold">Saiful Islam </h1>
              <h1 className="text-base text-gray-500 mt-2 font-semibold">
                400 follower
              </h1>
            </div>
          </div>
          {/* right button */}
          <div className="pr-5">
            <button className="flex bg-green-500 text-white rounded-lg p-1 items-center gap-2">
              <FaPlus className="text-xl" />{" "}
              <span className="text-lg font-semibold">Follow</span>
            </button>
          </div>
        </div>


        <hr />

        {/* bio and other post. */}

        <div className="flex lg:flex-row lg:px-0 px-3 flex-col items-start gap-4 mt-4">
          {/* bio section */}
          <div className="lg:w-[40%] w-full rounded-xl shadow-md p-3 bg-white min-h-4 border">
            <h1 className="text-xl font-bold">Intro</h1>
            <p className="text-center mt-4">my blood group is A+</p>

            <button className="flex w-full mt-5 justify-center gap-3 bg-green-500 text-white rounded-lg p-1 items-center">
              <MdModeEditOutline className="text-xl" />{" "}
              <span className="text-lg font-semibold">Edit Bio</span>
            </button>
            {/* home and designation. */}



            <section className="mt-6 flex flex-col gap-3">


              <div className="flex gap-3">
                <PiStudentBold className="text-3xl text-gray-500" />
                <div className="text-base font-semibold">
                  <span>Study at</span>{" "}
                  <input
                    className="focus:outline-none"
                    defaultValue={"Chandpur GVT. Clg"}
                    type="text"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <IoHomeSharp className="text-2xl text-gray-500" />
                <div className="text-base font-semibold">
                  <span>Live in</span>{" "}
                  <input
                    className="focus:outline-none"
                    defaultValue={"Shahrasti,Chandpur"}
                    type="text"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <MdEmail className="text-2xl text-gray-500" />
                <div className="text-base font-semibold">
                  
                  <input
                    className="focus:outline-none"
                    defaultValue={userData?.email} 
                    type="text"
                    disabled
                  />
                </div>
              </div>


              <div className="flex gap-3">
                <FaPhoneAlt className="text-xl text-gray-500" />
                <div className="text-base font-semibold">
                 
                  <input
                    className="focus:outline-none"
                    defaultValue={userData?.phone}
                    type="number"
                    disabled
                  />
                </div>
              </div>

 <button className="flex w-full mt-4 justify-center gap-3 bg-green-500 text-white rounded-lg p-1 items-center">
 <MdModeEditOutline className="text-xl" />{" "}
 <span className="text-lg font-semibold">Edit Details</span>
</button>

            </section>



          </div>



          {/* posts. */}
          <div className="lg:w-[60%] w-full rounded-xl shadow-md p-3 min-h-28 border bg-white">
            <h1>posts</h1>
          </div>
        </div>
      </div>
    </Tocenter>
  );
};

export default Profile;
