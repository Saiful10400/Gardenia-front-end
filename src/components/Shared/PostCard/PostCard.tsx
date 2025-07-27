"use client";

import Image from "next/image";
import React, { useState } from "react";
import "./style.css";
import parse from "html-react-parser";
import {
  CircleArrowDown,
  CircleArrowUp,
  MessageCircle,
  SendHorizonal,
} from "lucide-react";
import { PiShareFat } from "react-icons/pi";
import {
  useCreateCommentMutation,
  useReactionMutation,
  useToggleFavouriteMutation,
} from "@/Redux/api/api";
import { useAppSelector } from "@/Redux/hoocks/Convaying";
import { toast } from "react-toastify";
import blueTick from "../../../assets/profile/blueTick.png";
import CommentCard from "./sub/CommentCard";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import dateFormatter from "@/utils/dateFormatter";
import { usePathname } from "next/navigation";

const PostCard = ({ data }) => {
  const [collaps, setCollaps] = useState(data?.post?.content.length >= 300);

  const { loggedInUser } = useAppSelector((e) => e.authStore);

  // managee reacton.
  const [setReaction, { isLoading: reactionLoadin }] = useReactionMutation();
  const handleReaction = (e:string) => {
    if (!loggedInUser) {
      return toast.error("Please Login First!", {
        position: "top-center",
      });
    }

    setReaction({
      post: data?.post?._id,
      reactor: loggedInUser?._id,
      reactionType: e,
    });
  };

  /// are your id exixt on the reactor array?.
  const reacted = loggedInUser
    ? data?.reaction?.find((item) => item.reactor === loggedInUser?._id)
    : null;

  // handle comment.

  const [createComment] = useCreateCommentMutation();
  const commentHandle = (e) => {
    e.preventDefault();

    if (!loggedInUser) {
      toast.error("Please login,before comment!", {
        position: "top-center",
      });
      return;
    }
    const comment = e.target.comment.value;

    createComment({
      commentor: loggedInUser._id,
      comment: comment,
      post: data?.post?._id,
    }).then((res) => {
      if (res?.data?.statusCode === 200) {
        toast.success("Commented!", {
          position: "top-center",
        });
        e.target.reset();
      }
    });
  };

  // copy button handle.

  const copyPostUrl = () => {
    navigator.clipboard
      .writeText(
        `${process.env.NEXT_PUBLIC_FRONT_END_URL}/post?id=${data?.post?._id}`
      )
      .then(() => {
        toast.success("Link Copyed.");
      });
  };

  // toggle favourite handle.
  const [toggleFav] = useToggleFavouriteMutation();
  const toggleFavourite = () => {
    if (!loggedInUser) {
      toast.error("Please login frist!", {
        position: "top-center",
      });
      return;
    }

    toggleFav({ postId: data?.post?._id, userId: loggedInUser?._id }).then(
      (res) => {}
    );
  };

   

  const favouriteArray = data?.favourite;

  const isThisFavourite = !loggedInUser
    ? false
    : favouriteArray?.find((item) => item?.userId === loggedInUser?._id);

  const canYousee =
    loggedInUser?.verifyed || data?.post?.creator?._id === loggedInUser?._id;

  // currnt route path name.
  const currentRoute=usePathname()
  const isInHomeRoute=currentRoute==="/"

  return (
    <div
      className={
        data?.post?.costing === "Paid"
          ? canYousee
            ? "block"
            : "hidden"
          : "block"
      }
      data-aos="fade-up"
    >
      {/* top image section. */}

      <section className="bg-white pt-6 pb-4  rounded-xl shadow-md ">
        <div className="flex justify-between items-start p-6 py-0">
          {/* condition group and profile post. */}

          {data?.post.isGroupPost && isInHomeRoute ? (
            <div className="flex items-start  gap-2">
              <div className="relative">
              <Link href={`/page?id=${data?.post?.group?._id}`}>
                <Image
                  src={data?.post?.group?.logo}
                  alt="postImage"
                  width={100}
                  height={100}
                  className="w-[40px] h-[40px] rounded-full"
                />
              </Link>
              <Link className="absolute -bottom-1 -right-1" href={`/profile?id=${data?.post?.creator?._id}`}>
                <Image
                  src={data?.post?.creator?.img}
                  alt="postImage"
                  width={100}
                  height={100}
                  className="w-[25px] h-[25px] rounded-full"
                />
              </Link>
              </div>
              <div className="ml-1">
                <Link
                  href={`/page?id=${data?.post?.group?._id}`}
                  className="font-bold text-base flex items-end gap-1 "
                >
                  <span> {data?.post?.group?.name}</span>{" "}
                 
                </Link>
                <Link
                  href={`/profile?id=${data?.post?.creator?._id}`}
                  className="font-bold text-base flex items-end gap-1 "
                >
                  <span className="font-semibold text-xs text-gray-600"> {data?.post?.creator?.name}</span>
                  {data?.post?.creator?.verifyed && (
                    <Image
                      className="w-[15px]  h-[15px] box-content"
                      src={blueTick}
                      width={200}
                      height={200}
                      alt="blueTick"
                    />
                  )}
                  {/* {data?.post?.isBlock && (
        <span className="font-bold text-red-500">Blocked</span>
      )} */}
                </Link>
                <h1 className="font-semibold flex gap-2 items-end text-gray-700 text-[14px]">
                  <span className="text-xs font-normal">{dateFormatter(data?.post?.createdAt)}</span>{" "}
                  {/* <span className="font-normal">{data?.post?.costing}</span> */}
                </h1>
              </div>
            </div>
          ) : (
            <div className="flex items-start  gap-2">
              <Link href={`/profile?id=${data?.post?.creator?._id}`}>
                <Image
                  src={data?.post?.creator?.img}
                  alt="postImage"
                  width={100}
                  height={100}
                  className="w-[40px] h-[40px] rounded-full"
                />
              </Link>
              <div>
                <Link
                  href={`/profile?id=${data?.post?.creator?._id}`}
                  className="font-bold text-base flex items-end gap-1 "
                >
                  <span> {data?.post?.creator?.name}</span>{" "}
                  {data?.post?.creator?.verifyed && (
                    <Image
                      className="w-[20px]  h-[20px] box-content"
                      src={blueTick}
                      width={200}
                      height={200}
                      alt="blueTick"
                    />
                  )}
                  {/* {data?.post?.isBlock && (
                  <span className="font-bold text-red-500">Blocked</span>
                )} */}
                </Link>
                <h1 className="font-semibold flex gap-2 items-end text-gray-700 text-[14px]">
                <span className="text-xs font-normal">{dateFormatter(data?.post?.createdAt)}</span>{" "}
                  {/* <span className="font-normal">{data?.post?.costing}</span> */}
                </h1>
              </div>
            </div>
          )}

          {/* <h1 className="bg-gray-300 rounded-[3px] text-gray-800 text-sm p-1 font-semibold">
            {data?.post?.category}
          </h1> */}
        </div>
        <button  onClick={() => setCollaps(p=>!p)} className="PostContainer text-start p-6 py-0 mt-3 ">
          {parse(
            collaps ? data?.post?.content?.slice(0, 300) : data?.post?.content
          )}
          {collaps && (
            <span
             
              className="text-base font-bold"
            >
              ... See more
            </span>
          )}
        </button>

        {/* image sction. */}

        <Image
          src={data?.post?.img}
          alt="postImage"
          height={1080}
          width={1920}
          className="w-full h-[500px] mb-3 object-cover   mt-4"
        />

        {/* reaction section */}

        <div className=" border-y flex items-center justify-between border-gray-400 px-8 py-3">
          <div className="flex items-center gap-4">
            <button
              disabled={reactionLoadin}
              onClick={() => handleReaction("up")}
            >
              <CircleArrowUp
                className={
                  reacted?.reactionType === "up"
                    ? "bg-[#25a82b] text-white rounded-full"
                    : "text-gray-500"
                }
                size={35}
              />
            </button>
            <h1 className="text-lg min-w-[30px] text-center font-medium">
              {data?.post?.vote}
            </h1>
            <button
              disabled={reactionLoadin}
              onClick={() => handleReaction("down")}
            >
              <CircleArrowDown
                className={
                  reacted?.reactionType === "down"
                    ? "bg-red-500 text-white rounded-full"
                    : "text-gray-500"
                }
                size={35}
              />
            </button>
          </div>

          {/* toggle fav andle. */}
          <div className="flex items-center gap-2">
            <button disabled={reactionLoadin} onClick={toggleFavourite}>
              <FaHeart
                className={isThisFavourite ? "text-red-500 " : "text-gray-500"}
                size={30}
              />
            </button>
            <h1 className="text-lg font-medium">{favouriteArray?.length}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                document
                  .getElementById(data?.post?._id?.toString())
                  ?.showModal()
              }
            >
              <MessageCircle className="text-gray-500" size={35} />
            </button>

            <h1 className="text-lg font-medium">{data?.comments?.length}</h1>
          </div>

          <button onClick={copyPostUrl}>
            <PiShareFat className="text-3xl text-gray-500" />
          </button>
        </div>
      </section>

      {/* modal. */}

      <dialog id={data?.post?._id?.toString()} className="modal ">
        <div className="modal-box lg:min-w-[600px] ">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <section className="bg-white pt-6 pb-4  rounded-xl ">
            <div className="flex justify-between items-start p-6 py-0">
              <div className="flex items-start  gap-2">
                <Image
                  src={data?.post?.creator?.img}
                  alt="postImage"
                  width={100}
                  height={100}
                  className="w-[40px] h-[40px] rounded-full"
                />
                <div>
                  <div className="font-bold text-base flex items-end gap-1 ">
                    <span> {data?.post?.creator?.name}</span>{" "}
                    {data?.post?.creator?.verifyed && (
                      <Image
                        className="w-[20px]  h-[20px] box-content"
                        src={blueTick}
                        width={200}
                        height={200}
                        alt="blueTick"
                      />
                    )}
                    {/* {data?.post?.isBlock && (
                      <span className="font-bold text-red-500">Blocked</span>
                    )} */}
                  </div>
                  <h1 className="font-semibold flex gap-2 items-end text-gray-700 text-[14px]">
                    <span>10h</span>{" "}
                    {/* <span className="font-normal">{data?.post?.costing}</span> */}
                  </h1>
                </div>
              </div>
              {/* <h1 className="bg-gray-300 rounded-[3px] text-gray-800 text-sm p-1 font-semibold">
                {data?.post?.category}
              </h1> */}
            </div>
            <div className="PostContainer p-6 py-0 mt-3 ">
              {parse(
                collaps
                  ? data?.post?.content?.slice(0, 300)
                  : data?.post?.content
              )}
              {collaps && (
                <button
                  onClick={() => setCollaps(false)}
                  className="text-base font-bold"
                >
                  ... See more
                </button>
              )}
            </div>

            {/* image sction. */}

            <Image
              src={data?.post?.img}
              alt="postImage"
              height={500}
              width={500}
              className="w-full mb-3 object-cover h-full mt-4"
            />

            {/* reaction section */}

            <div className=" border-y flex items-center justify-between border-gray-400 px-8 py-3">
              <div className="flex items-center gap-4">
                <button
                  disabled={reactionLoadin}
                  onClick={() => handleReaction("up")}
                >
                  <CircleArrowUp
                    className={
                      reacted?.reactionType === "up"
                        ? "bg-[#25a82b] text-white rounded-full"
                        : "text-gray-500"
                    }
                    size={35}
                  />
                </button>
                <h1 className="text-lg min-w-[30px] text-center font-medium">
                  {data?.post?.vote}
                </h1>
                <button
                  disabled={reactionLoadin}
                  onClick={() => handleReaction("down")}
                >
                  <CircleArrowDown
                    className={
                      reacted?.reactionType === "down"
                        ? "bg-red-500 text-white rounded-full"
                        : "text-gray-500"
                    }
                    size={35}
                  />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    document
                      .getElementById(data?.post?._id?.toString())
                      ?.showModal()
                  }
                >
                  <MessageCircle className="text-gray-500" size={35} />
                </button>

                <h1 className="text-lg font-medium">
                  {data?.comments?.length}
                </h1>
              </div>

              <button>
                <PiShareFat className="text-3xl text-gray-500" />
              </button>
            </div>
          </section>

          {/* comment section. */}

          <section className="min-h-[100px] grid grid-cols-1 gap-5">
            {data?.comments?.map((item, idx) => (
              <CommentCard key={idx} item={item} />
            ))}
          </section>

          <form
            onSubmit={commentHandle}
            className="border mt-5  flex items-end sticky bottom-[-25px] pr-2 pb-3 w-full bg-gray-200 rounded-lg left-0"
          >
            <textarea
              className="w-full min-h-[40px] bg-transparent p-1 pt-2 focus:outline-none resize-none"
              name="comment"
              placeholder="Write your comment here"
            ></textarea>
            <button className="text-gray-600">
              <SendHorizonal />
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default PostCard;
