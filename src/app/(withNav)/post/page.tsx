"use client";

import Tocenter from "@/components/Helper/Tocenter";
import { useGetApostQuery } from "@/Redux/api/api";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import parse from "html-react-parser";
import Loading from "@/components/Shared/Loading/Loading";
import blueTick from "../../../assets/profile/blueTick.png";
import "./style.css";
import { Download } from "lucide-react";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PostComponent = () => {
  // get the id .
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data, isLoading } = useGetApostQuery(id);


  const post = data?.data?.post;


  // triggard pdf to be downloaded.
const printRef=useRef(null)
  const handlePdfDownLoad = async () => {
   

    try {
      
      const canvas = await html2canvas();
      console.log(canvas)
      const ImageData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: "a4",
      });
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;

      pdf.addImage(ImageData, "PNG", 0, 0, width, height);
      pdf.save("Post.pdf");
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <Tocenter>
      <div>
        <button
          onClick={handlePdfDownLoad}
          className="fixed bottom-7 right-7 flex gap-2 font-semibold bg-green-500 p-2 rounded-lg text-white"
        >
          <Download /> Download as Pdf
        </button>
{/* print */}
        <div ref={printRef} className="flex justify-between items-start p-6 py-5">
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
        <div  className="PostContainer mt-5">{parse(post?.content)}</div>
      </div>
    </Tocenter>
  );
};

// Use dynamic import with SSR disabled
const Post = dynamic(() => Promise.resolve(PostComponent), {
  ssr: false,
});

export default Post;
