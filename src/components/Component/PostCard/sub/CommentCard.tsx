"use client";
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "@/Redux/api/api";
import { Ellipsis, SendHorizonal } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const CommentCard = ({ item }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [edit, setEdit] = useState(false);

  ///

  //delete comment.

  const [deleComment] = useDeleteCommentMutation();
  const [updateComment] = useUpdateCommentMutation();

  const deleteHandle = () => {
    deleComment(item._id).then(() => {
      
    });
  };

const editHandle=(e)=>{
    e.preventDefault()
    const comment=e.target.comment.value
    updateComment({id:item._id,comment}).then(()=>{
      
        setEdit(false)
    })
}



 
  return (
    <div>
      <div className="flex items-center relative gap-2">
        <Image
          height={50}
          width={50}
          alt="user-image"
          src={item?.commentor?.img}
          className="w-[50px] h-[50px] rounded-full"
        />
        <h1 className="font-semibold">{item?.commentor?.name}</h1>
        <button onClick={() => setShowMenu((prev) => !prev)}>
          <Ellipsis />
        </button>

        {showMenu && (
          <div className="bg-gray-400 text-gray-100 rounded-lg z-30 font-bold absolute flex flex-col w-[100px] py-4 right-[64px] top-[20px] lg:top-[18px] lg:right-[256px]">
            <button
              onClick={deleteHandle}
              className="hover:bg-white hover:text-black"
            >
              Delete
            </button>
            <button
              onClick={() => {
                setEdit(true);
                setShowMenu(false);
              }}
              className="hover:bg-white hover:text-black"
            >
              Edit
            </button>
          </div>
        )}
      </div>

      <form onSubmit={editHandle} className="bg-gray-200 w-[50%] relative ml-[50px] p-1 rounded-lg font-medium">
        <textarea
        name="comment"
          disabled={!edit}
          className="bg-transparent focus:outline-none w-full resize-none pl-1 pt-1 "
          defaultValue={item.comment}
        ></textarea>
        {edit && (
          <button className="absolute bottom-2 text-gray-600 right-2">
            <SendHorizonal size={16} />
          </button>
        )}
      </form>
    </div>
  );
};

export default CommentCard;
