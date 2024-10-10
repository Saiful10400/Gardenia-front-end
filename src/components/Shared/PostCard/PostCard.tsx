import Image from "next/image";
import React, { useState } from "react";
import "./style.css";
import parse from "html-react-parser";
import { CircleArrowDown, CircleArrowUp, MessageCircle } from "lucide-react";
import { PiShareFat } from "react-icons/pi";
import { useReactionMutation } from "@/Redux/api/api";
import { useAppSelector } from "@/Redux/hoocks/Convaying";
import { toast } from "react-toastify";
const PostCard = ({ data }) => {
  const [collaps, setCollaps] = useState(data?.post?.content.length >= 300);

  const { loggedInUser, isLoading: currentLoading } = useAppSelector(
    (e) => e.authStore
  );

  // managee reacton.
  const [setReaction, { isLoading: reactionLoadin }] = useReactionMutation();
  const handleReaction = (e) => {
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
const reacted=loggedInUser?data?.reaction?.find(item=>item.reactor===loggedInUser?._id):null
console.log(reacted,"are he liked or not. check.")


  return (
    <div>
      {/* top image section. */}

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
              <h1 className="font-bold text-base ">
                {data?.post?.creator?.name}
              </h1>
              <h1 className="font-semibold flex gap-2 items-end text-gray-700 text-[14px]">
                <span>10h</span>{" "}
                <span className="font-normal">{data?.post?.costing}</span>
              </h1>
            </div>
          </div>
          <h1 className="bg-gray-300 rounded-[3px] text-gray-800 text-sm p-1 font-semibold">
            {data?.post?.category}
          </h1>
        </div>
        <div className="PostContainer p-6 py-0 mt-3 ">
          {parse(
            collaps ? data?.post?.content?.slice(0, 300) : data?.post?.content
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
          height={1080}
          width={1920}
          className="w-full mb-3 object-cover h-full mt-4"
        />

        {/* reaction section */}

        <div className=" border-y flex items-center justify-between border-gray-400 px-8 py-3">
          <div className="flex items-center gap-4">
            <button disabled={reactionLoadin} onClick={() => handleReaction("up")}>
              <CircleArrowUp className={reacted?.reactionType==="up"?"bg-green-500 text-white rounded-full":"text-gray-500"} size={35} />
            </button>
            <h1 className="text-lg min-w-[30px] text-center font-medium">{data?.post?.vote}</h1>
            <button disabled={reactionLoadin}  onClick={() => handleReaction("down")}>
              <CircleArrowDown
                className={reacted?.reactionType==="down"?"bg-red-500 text-white rounded-full":"text-gray-500"}
                size={35}
              />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button>
              <MessageCircle className="text-gray-500" size={35} />
            </button>

            <h1 className="text-lg font-medium">{20}</h1>
          </div>

          <button>
            <PiShareFat className="text-3xl text-gray-500" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default PostCard;
