"use client";

import Image from "next/image";
import React, { useState } from "react";
import parse from "html-react-parser";
import {
  CircleArrowDown,
  CircleArrowUp,
  MessageCircle,
} from "lucide-react";
import { PiShareFat } from "react-icons/pi";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import { toast } from "react-toastify";
import { TpostCard } from "@/Types";

import blueTick from "../../../assets/profile/blueTick.png";
import dateFormatter from "@/utils/dateFormatter";
import {
  useCreateCommentMutation,
  useReactionMutation,
  useToggleFavouriteMutation,
} from "@/Redux/api/api";
import { useAppSelector } from "@/Redux/hoocks/Convaying";
import CommentModal from "./CommentModal";
import { usePathname } from "next/navigation";
import ContentImage from "./ContentImage";

const PostCard = ({ data }: { data: TpostCard }) => {
  const route = usePathname();

  const [collaps, setCollaps] = useState(data.post.content.length > 300);
  const { loggedInUser } = useAppSelector((e) => e.authStore);

  const [setReaction, { isLoading: reactionLoading }] = useReactionMutation();
  const [toggleFav] = useToggleFavouriteMutation();
  const [createComment] = useCreateCommentMutation();

  const reacted = loggedInUser
    ? data.reaction?.find((item) => item.reactor === loggedInUser._id)
    : null;

  const handleReaction = (type: string) => {
    if (!loggedInUser)
      return toast.error("Login first!", { position: "top-center" });

    setReaction({
      post: data.post._id,
      reactor: loggedInUser._id,
      reactionType: type,
    });
  };

  const toggleFavourite = () => {
    if (!loggedInUser)
      return toast.error("Login first!", { position: "top-center" });

    toggleFav({ postId: data.post._id, userId: loggedInUser._id });
  };

  const commentHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loggedInUser)
      return toast.error("Login first!", { position: "top-center" });

    const comment = (e.currentTarget as any).comment.value;

    createComment({
      post: data.post._id,
      comment,
      commentor: loggedInUser._id,
    }).then(() => {
      toast.success("Commented!");
      e.currentTarget.reset();
    });
  };

  const openCommentModal = () => {
    const modal = document.getElementById(data?.post?._id) as HTMLDialogElement;
    modal?.showModal();
  };

  const isThisFavourite = loggedInUser
    ? data.favourite?.some((item) => item.userId === loggedInUser._id)
    : false;

  return (
    <div className="bg-white dark:bg-[#1b311e] rounded-xl border border-slate-200 dark:border-[#26a82c]/20 overflow-hidden shadow-sm">

      {/* HEADER */}

      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">

          <Link href={`/profile?id=${data.post.creator?._id}`}>
            <Image
              src={data.post.creator?.img || "/default-avatar.png"}
              width={40}
              height={40}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          </Link>

          <div className="flex flex-col">
            <Link
              href={`/profile?id=${data.post.creator?._id}`}
              className="text-sm font-bold flex items-center gap-1"
            >
              {data.post.creator?.name}

              {data.post.creator?.verifyed && (
                <Image
                  src={blueTick}
                  width={14}
                  height={14}
                  alt="verified"
                />
              )}
            </Link>

            <span className="text-xs text-gray-500">
              {dateFormatter(data?.post?.createdAt)}
            </span>
          </div>
        </div>
      </div>

      {/* CONTENT */}

      <div className="px-4 pb-3 text-sm text-slate-700 dark:text-slate-200 leading-relaxed break-words">
        {parse(collaps ? data.post.content.slice(0, 300) : data.post.content)}

        {data.post.content.length > 300 && (
          <button
            onClick={() => setCollaps((prev) => !prev)}
            className="ml-1 text-[#26a82c] font-semibold"
          >
            {collaps ? "... See more" : " See less"}
          </button>
        )}
      </div>

      {/* IMAGE */}

      {data.post.img && (
        <div className="px-4 pb-3">
          <Link href={`/post?id=${data.post._id}`}>
            <ContentImage link={data.post.img} />
          </Link>
        </div>
      )}

      {/* ACTION BAR */}

      <div className="p-4 flex items-center justify-between">

        <div className="flex items-center gap-3">

          {/* VOTES */}

          <div className="flex items-center bg-gray-100 dark:bg-[#122014] rounded-full px-1 py-1">

            <button
              onClick={() => handleReaction("up")}
              className="p-2 rounded-full hover:bg-green-100"
            >
              <CircleArrowUp
                size={22}
                className={
                  reacted?.reactionType === "up"
                    ? "text-green-500"
                    : "text-gray-400"
                }
              />
            </button>

            <span className="px-2 text-xs font-bold">
              {data.post.vote}
            </span>

            <button
              onClick={() => handleReaction("down")}
              className="p-2 rounded-full hover:bg-red-100"
            >
              <CircleArrowDown
                size={22}
                className={
                  reacted?.reactionType === "down"
                    ? "text-red-500"
                    : "text-gray-400"
                }
              />
            </button>

          </div>

          {/* COMMENTS */}

          <button
            onClick={openCommentModal}
            className="flex items-center gap-2 px-3 py-2 rounded-full text-gray-500 hover:bg-[#26a82c]/10 hover:text-[#26a82c]"
          >
            <MessageCircle size={20} />
            <span className="text-xs font-bold">
              {data.comments?.length || 0}
            </span>
          </button>

          {/* SHARE */}

          <button className="flex items-center gap-2 px-3 py-2 rounded-full text-gray-500 hover:bg-[#26a82c]/10 hover:text-[#26a82c]">
            <PiShareFat size={20} />
            <span className="text-xs font-bold">Share</span>
          </button>

        </div>

        {/* FAVOURITE */}

        <button
          onClick={toggleFavourite}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-50"
        >
          <FaHeart
            className={`text-xl ${
              isThisFavourite ? "text-red-500" : "text-gray-400"
            }`}
          />
        </button>

      </div>

      {/* COMMENT INPUT TRIGGER */}

      {loggedInUser && (
        <div className="px-4 pb-4 border-t border-gray-100 pt-4">
          <div className="flex items-center gap-3">

            <Image
              src={loggedInUser.img || "/default-avatar.png"}
              width={32}
              height={32}
              alt="user"
              className="w-8 h-8 rounded-full object-cover"
            />

            <input
              readOnly
              onClick={openCommentModal}
              placeholder="Add a comment..."
              className="flex-1 bg-gray-100 dark:bg-[#122014] rounded-lg px-4 py-2 text-sm outline-none cursor-pointer"
            />

          </div>
        </div>
      )}

      <CommentModal
        commentHandle={commentHandle}
        handleReaction={handleReaction}
        reacted={reacted}
        reactionLoading={reactionLoading}
        data={data}
      />
    </div>
  );
};

export default PostCard;