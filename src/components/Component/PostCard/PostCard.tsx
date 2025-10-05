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

  const route=usePathname()
 
 
  const [collaps, setCollaps] = useState(data.post.content.length > 300);
  const { loggedInUser } = useAppSelector((e) => e.authStore);

  const [setReaction, { isLoading: reactionLoading }] = useReactionMutation();
  const [toggleFav] = useToggleFavouriteMutation();
  const [createComment] = useCreateCommentMutation();

  const reacted = loggedInUser
    ? data.reaction?.find((item) => item.reactor === loggedInUser._id)
    : null;

  const handleReaction = (type: string) => {
    if (!loggedInUser) return toast.error("Login first!", { position: "top-center" });
    setReaction({ post: data.post._id, reactor: loggedInUser._id, reactionType: type });
  };

  const toggleFavourite = () => {
    if (!loggedInUser) return toast.error("Login first!", { position: "top-center" });
    toggleFav({ postId: data.post._id, userId: loggedInUser._id });
  };

  const commentHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loggedInUser) return toast.error("Login first!", { position: "top-center" });
    const comment = e.currentTarget.comment.value;
    createComment({ post: data.post._id, comment, commentor: loggedInUser._id }).then(() => {
      toast.success("Commented!");
      e.currentTarget?.reset();
    });
  };

  const isThisFavourite = loggedInUser
    ? data.favourite?.some((item) => item.userId === loggedInUser._id)
    : false;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 mb-6">




      {/* Header */}
      {data.post.isGroupPost && !route.includes("/page") ? (<div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 object-cover relative">
            <Link className="w-full h-full" href={`/profile?id=${data.post.creator?._id}`}>
              <Image
                src={data.post.group?.logo || "/default-avatar.png"}
                alt="Profile"
                width={48}
                height={48}
                className="w-full h-full rounded-full "
              />
            </Link>

            <Link className="absolute -bottom-2 -right-1 z-10" href={`/profile?id=${data.post.creator?._id}`}>
              <Image
                src={data.post.creator?.img || "/default-avatar.png"}
                alt="Profile"
                width={48}
                height={48}
                className="w-8 h-8 rounded-full object-cover"
              />
            </Link>
          </div>

          <div className="flex flex-col">
            <Link
              href={`/page?id=${data.post.group?._id}`}
              className="font-semibold hover:text-blue-600"
            >
              {data.post.group?.name}
              
            </Link>
            <div className="flex items-center gap-1">
            <Link
              href={`/profile?id=${data.post.creator?._id}`}
              className="font-semibold text-gray-600 text-xs hover:text-blue-600"
            >
              {data.post.creator?.name}
              {data.post.creator?.verifyed && (
                <Image src={blueTick} width={16} height={16} alt="Verified" className="inline ml-1" />
              )}
            </Link>
            <span className="text-xs text-gray-500">{dateFormatter(data?.post?.createdAt)}</span></div>
          </div>
        </div>
      </div>) : (<div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">

          <Link href={`/profile?id=${data.post.creator?._id}`}>
            <Image
              src={data.post.creator?.img || "/default-avatar.png"}
              alt="Profile"
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover"
            />
          </Link>
          <div className="flex flex-col">
            <Link
              href={`/profile?id=${data.post.creator?._id}`}
              className="font-semibold hover:text-blue-600"
            >
              {data.post.creator?.name}
              {data.post.creator?.verifyed && (
                <Image src={blueTick} width={16} height={16} alt="Verified" className="inline ml-1" />
              )}
            </Link>
            <span className="text-xs text-gray-500">{dateFormatter(data?.post?.createdAt)}</span>
          </div>
        </div>
      </div>)}


      {/* Content */}
      <div className="px-4 pb-4 text-gray-700 break-words">
        {parse(collaps ? data.post.content.slice(0, 300) : data.post.content)}
        {data.post.content.length > 300 && (
          <button
            onClick={() => setCollaps((prev) => !prev)}
            className="ml-1 text-[#61d89c] font-semibold"
          >
            {collaps ? "... See more" : " See less"}
          </button>
        )}
      </div>

      {/* Post Image */}
      {data.post.img && (
        <ContentImage link={data.post.img} />
      )}

      {/* Reaction Bar */}
      <div className="flex justify-between items-center border-t border-gray-200 px-4 py-3">
        <div className="flex items-center gap-4">
          <button onClick={() => handleReaction("up")}>
            <CircleArrowUp
              size={28}
              className={reacted?.reactionType === "up" ? "text-green-500" : "text-gray-400"}
            />
          </button>
          <span className="font-medium">{data.post.vote}</span>
          <button onClick={() => handleReaction("down")}>
            <CircleArrowDown
              size={28}
              className={reacted?.reactionType === "down" ? "text-red-500" : "text-gray-400"}
            />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={toggleFavourite}>
            <FaHeart className={`text-2xl ${isThisFavourite ? "text-red-500" : "text-gray-400"}`} />
          </button>
          <span className="font-medium">{data.favourite?.length || 0}</span>

          <button onClick={() => document.getElementById(data?.post?._id)?.showModal()}>
            <MessageCircle className="text-gray-400" size={28} />
          </button>
          <span className="font-medium">{data.comments?.length || 0}</span>

          <button>
            <PiShareFat className="text-gray-400 text-2xl" />
          </button>
        </div>
      </div>

      <CommentModal commentHandle={commentHandle} handleReaction={handleReaction} reacted={reacted} reactionLoading={reactionLoading} data={data} />
    </div>
  );
};

export default PostCard;
