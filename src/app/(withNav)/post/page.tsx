"use client";

import Tocenter from "@/components/Helper/Tocenter";
import { useGetApostQuery } from "@/Redux/api/api";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import parse from "html-react-parser";
import Loading from "@/components/Shared/Loading/Loading";
import blueTick from "../../../assets/profile/blueTick.png"
import "./style.css"
const PostComponent = () => {
  // get the id .
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data, isLoading } = useGetApostQuery(id);
  console.log(data);

  const post = data?.data?.post;
  console.log(post);
  return isLoading ? (
    <Loading />
  ) : (
    <Tocenter>
      <div className=" ">

      <div className="flex justify-between items-start p-6 py-5">
          <div className="flex items-start  gap-2">
            <Image
              src={post?.creator?.img}
              alt="postImage"
              width={200}
              height={200}
              className="w-[60px] h-[60px] rounded-full"
            />
            <div>
              <div className="font-bold text-base flex gap-1 ">
                <span> {post?.creator?.name}</span>{" "}
                {post?.creator?.verifyed && (
                  <Image
                    className="w-[30px]  h-[30px] box-content"
                    src={blueTick}
                    width={200}
                    height={200}
                    alt="blueTick"
                  />
                )}
                {post?.isBlock && (
                  <span className="font-bold text-red-500">Blocked</span>
                )}
              </div>
              <h1 className="font-semibold flex gap-2 items-end text-gray-700 text-[14px]">
                <span>10h</span>{" "}
                <span className="font-normal">{post?.costing}</span>
              </h1>
            </div>
          </div>
          <h1 className="bg-gray-300 rounded-[3px] text-gray-800 text-sm p-1 font-semibold">
            {post?.category}
          </h1>
        </div>


        <div className="">
          <Image
            className="w-full lg:h-[400px] object-cover"
            height={600}
            width={800}
            alt="blogImage"
            src={post?.img}
          />
        </div>
        <div className="PostContainer mt-5">{parse(post?.content)}</div>
      </div>
    </Tocenter>
  );
};

// Use dynamic import with SSR disabled
const Post = dynamic(() => Promise.resolve(PostComponent), {
  ssr: false,
});

export default Post;
