"use client";
import Image from "next/image";
import React, { useState } from "react";
import { CircleArrowDown, CircleArrowUp, MessageCircle, SendHorizonal } from "lucide-react";
import CommentCard from "./subComponentAndUtils/CommentCard";
import blueTick from "../../../assets/profile/blueTick.png";
import { PiShareFat } from "react-icons/pi";
import parse from "html-react-parser";
const CommentModal = ({ data, commentHandle, reactionLoading, handleReaction, reacted }) => {
    const [collaps, setCollaps] = useState(data.post.content.length > 300);

    return (
        <dialog
            id={data?.post?._id?.toString()}
            className="modal backdrop:bg-black/30 backdrop:backdrop-blur-sm "
        >
            <div className="modal-box w-full max-w-2xl p-4 relative rounded-xl shadow-xl ">
                {/* Close Button */}
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 text-green-700 hover:bg-green-200 transition">
                        ✕
                    </button>
                </form>




                <div>
                    {/* Post Header */}
                    <div className="flex items-start gap-3 mb-4">
                        <Image
                            src={data?.post?.creator?.img}
                            alt="creator"
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900">{data?.post?.creator?.name}</span>
                                {data?.post?.creator?.verifyed && (
                                    <Image src={blueTick} width={16} height={16} alt="Verified" />
                                )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{data?.post?.createdAt.$date}</p>
                        </div>
                    </div>

                    {/* Post Content */}
                    <div className="text-gray-800 mb-3">
                        {parse(collaps ? data?.post?.content.slice(0, 300) : data?.post?.content)}
                        {data?.post?.content.length > 300 && (
                            <button
                                onClick={() => setCollaps((prev) => !prev)}
                                className="ml-1 text-[#61d89c] font-semibold"
                            >
                                {collaps ? "... See more" : " See less"}
                            </button>
                        )}
                    </div>

                    {/* Post Image */}
                    {data?.post?.img && (
                        <Image
                            src={data?.post?.img}
                            alt="post"
                            height={500}
                            width={500}
                            className="w-full h-auto rounded-lg object-cover mb-4"
                        />
                    )}

                    {/* Reactions Section */}
                    <div className="flex items-center justify-between border-t border-b border-gray-200 py-3 px-2 mb-4">
                        <div className="flex items-center gap-4">
                            <button
                                disabled={reactionLoading}
                                onClick={() => handleReaction("up")}
                                className={reacted?.reactionType === "up" ? "text-green-600" : "text-gray-400"}
                            >
                                <CircleArrowUp size={30} />
                            </button>
                            <span className="text-md font-medium">{data?.post?.vote}</span>
                            <button
                                disabled={reactionLoading}
                                onClick={() => handleReaction("down")}
                                className={reacted?.reactionType === "down" ? "text-red-600" : "text-gray-400"}
                            >
                                <CircleArrowDown size={30} />
                            </button>
                        </div>

                        <div className="flex items-center gap-4">
                            <button>
                                <MessageCircle size={24} className="text-gray-400" />
                            </button>
                            <span className="text-md font-medium">{data?.comments?.length}</span>

                            <button onClick={() => navigator.clipboard.writeText(window.location.href)}>
                                <PiShareFat size={24} className="text-gray-400" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Comments List */}
                <div className="flex flex-col gap-3 max-h-72 overflow-y-auto mb-4 px-1">
                    {data?.comments?.map((item, idx) => (
                        <CommentCard key={idx} item={item} />
                    ))}
                </div>

                {/* Comment Input */}
                <form
                    onSubmit={commentHandle}
                    className="flex items-center gap-2 border-t border-green-200 pt-2 pb-3 sticky -bottom-4 rounded-lg pl-2 px-1 bg-green-50"
                >
                    <textarea
                        name="comment"
                        placeholder="Write a comment..."
                        className="flex-1 p-2 rounded-lg border border-green-300 resize-none focus:outline-none focus:ring focus:ring-green-200 bg-white"
                    />
                    <button className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition">
                        <SendHorizonal size={18} />
                    </button>
                </form>
            </div>
        </dialog>
    );
};

export default CommentModal;
