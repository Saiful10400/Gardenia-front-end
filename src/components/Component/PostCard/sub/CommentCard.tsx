"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Ellipsis, SendHorizonal, Trash2, Edit2 } from "lucide-react";
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "@/Redux/api/api";
import dateFormatter from "@/utils/dateFormatter";

const CommentCard = ({ item }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [edit, setEdit] = useState(false);

  const [deleteComment] = useDeleteCommentMutation();
  const [updateComment] = useUpdateCommentMutation();

  const deleteHandle = () => deleteComment(item._id);

  const editHandle = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    updateComment({ id: item._id, comment }).then(() => setEdit(false));
  };

  return (
    <div className=" rounded-lg p-3 flex flex-col gap-2 relative border border-green-200 transition">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            src={item.commentor.img}
            alt={item.commentor.name}
            width={32}
            height={32}
            className="rounded-full object-cover"
          />
          <div className="flex flex-col text-sm">
            <span className="font-semibold text-gray-800">{item.commentor.name}</span>
            <span className="text-xs text-green-700">{dateFormatter(item.createdAt)}</span>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowMenu((prev) => !prev)}
            className="p-1 rounded-full hover:bg-green-200 transition"
          >
            <Ellipsis size={18} />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-green-200 rounded shadow-md w-24 z-50 flex flex-col">
              <button className="flex items-center gap-1 px-2 py-1 text-xs hover:bg-red-500 hover:text-white rounded-t" onClick={deleteHandle}>
                <Trash2 size={14} /> Delete
              </button>
              <button className="flex items-center gap-1 px-2 py-1 text-xs hover:bg-green-500 hover:text-white rounded-b" onClick={() => { setEdit(true); setShowMenu(false); }}>
                <Edit2 size={14} /> Edit
              </button>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={editHandle} className="relative">
        <textarea
          name="comment"
          defaultValue={item.comment}
          disabled={!edit}
          className={`w-full rounded-md p-2 text-sm resize-none border ${
            edit ? "border-green-400 bg-white" : "border-green-100 "
          } focus:outline-none focus:ring-1 focus:ring-green-300 transition`}
        />
        {edit && (
          <button type="submit" className="absolute bottom-3 right-1 bg-green-500 hover:bg-green-600 text-white p-1 rounded-full">
            <SendHorizonal size={14} />
          </button>
        )}
      </form>
    </div>
  );
};

export default CommentCard;
