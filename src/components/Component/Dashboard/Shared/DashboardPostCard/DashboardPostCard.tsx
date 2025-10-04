"use client"

import { useBlockAPostMutation } from "@/Redux/api/api";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const DashboardPostCard = ({ data }) => {




  const { post } = data;
  const { creator } = post;

  const [showDropDown, setShowDropDown] = useState(false);

  // delete handle.

  // const [deletePost] = useDeletePostMutation();

  // const deleteHandle = () => {
  //   deletePost(post._id).then((res) => {
     
  //   });
  // };

  //block handle.
  const [block] = useBlockAPostMutation();
  const blockHandle = () => {
    block(post._id).then((res) => {
      if (res.data.statusCode === 200) {
        toast.success("Updated", {
          position: "top-center",
        });
        setShowDropDown(false);
      }
    });
  };

  return (
    <div data-aos="zoom-in" className="bg-white relative p-2 rounded-lg shadow-sm shadow-gray-300">
      <div
        style={{ display: showDropDown ? "flex" : "none" }}
        className="absolute top-[35px] flex-col px-4 text-xs gap-3  rounded-lg py-2 right-[10px] bg-gray-300 "
      >
        <Link className="font-semibold  hover hover:bg-white " href={""}>
          Details
        </Link>
        <button
          onClick={blockHandle}
          className="font-semibold hover hover:bg-white  "
        >
          {post.isBlock ? "Un-block" : "Block"}
        </button>
        <button
          // onClick={deleteHandle}
          className="font-semibold hover hover:bg-white  "
        >
          Delete
        </button>
      </div>

      <section className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <Image
            height={100}
            width={100}
            alt="profile_image"
            src={creator.img}
            className="w-[40px] h-[40px] rounded-full object-cover"
          />
          <div>
            <h1 className="font-semibold text-gray-800 text-sm">
              {creator.name}
            </h1>
            <h1 className="font-semibold text-gray-800 text-sm">1h</h1>
          </div>
        </div>

        <button onClick={() => setShowDropDown((prev) => !prev)}>
          <EllipsisVertical size={20} />
        </button>
      </section>

      <section className="px-1 mt-2">
        <h1 className="font-semibold">
          Total vote: <span className="font-normal text-sm">{post.vote}</span>
        </h1>
        <h1 className="font-semibold">
          Total commetns: <span className="font-normal text-sm">{"n/a"}</span>
        </h1>
        <h1 className="font-semibold">
          Category: <span className="font-normal text-sm">{post.category}</span>
        </h1>
        <h1 className="font-semibold">
          Status:{" "}
          <span
            className={` font-semibold text-sm ${
              post.isBlock && "text-red-500 "
            }`}
          >
            {post.isBlock ? "Block" : "Public"}
          </span>
        </h1>
      </section>
    </div>
  );
};

export default DashboardPostCard;
