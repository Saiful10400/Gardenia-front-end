"use client";

import Tocenter from "@/components/Helper/Tocenter";
import { useGetApostQuery } from "@/Redux/api/api";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import parse from "html-react-parser";
import Loading from "@/components/Component/Loading/Loading";
import blueTick from "../../../assets/profile/blueTick.png";
import { Download, X } from "lucide-react";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import dayjs from "dayjs";

const PostComponent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data, isLoading } = useGetApostQuery(id);
  const post = data?.data?.post;

  const printRef = useRef<HTMLDivElement>(null);

  const [isImageFullScreen, setIsImageFullScreen] = useState(false);

  // Trigger PDF download
  const handlePdfDownLoad = async () => {
    if (!printRef.current) return;

    try {
      const canvas = await html2canvas(printRef.current, { scale: 2 });
      const imageData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;

      pdf.addImage(imageData, "PNG", 0, 0, width, height);
      pdf.save(`${post?.title || "post"}.pdf`);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <Tocenter>
      <div className="w-full max-w-4xl mx-auto p-4 lg:p-8 space-y-8 relative">
        {/* PDF Download Button */}
        <button
          onClick={handlePdfDownLoad}
          className="fixed bottom-6 right-6 flex items-center gap-2 font-semibold bg-[#25a82b] px-5 py-2 rounded-full shadow-lg text-white hover:bg-[#1e8a24] transition-all duration-300 z-50"
        >
          <Download size={18} /> Download PDF
        </button>

        {/* Fullscreen Image Overlay */}
        {isImageFullScreen && post?.img && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex justify-center items-center p-4">
            <button
              onClick={() => setIsImageFullScreen(false)}
              className="absolute top-6 right-6 text-white bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition"
            >
              <X size={24} />
            </button>
            <Image
              src={post.img}
              alt={post.title || "Post Image"}
              width={1200}
              height={800}
              className="max-h-full max-w-full object-contain rounded-lg"
            />
          </div>
        )}

        <div
          ref={printRef}
          className="bg-white rounded-xl shadow-md overflow-hidden transition-all"
        >
          {/* Header: Author + Category + Meta */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-6 gap-4 border-b">
            <div className="flex items-start gap-4">
              <Image
                src={post?.creator?.img}
                alt={post?.creator?.name}
                width={60}
                height={60}
                className="rounded-full w-14 h-14 object-cover"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-semibold text-lg">{post?.creator?.name}</h1>
                  {post?.creator?.verifyed && (
                    <Image
                      src={blueTick}
                      alt="Verified"
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                  )}
                  {post?.isBlock && (
                    <span className="text-red-500 font-semibold text-sm">
                      Blocked
                    </span>
                  )}
                </div>
                <p className="text-gray-500 text-sm mt-1">
                  {dayjs(post?.createdAt).format("MMM D, YYYY")}
                </p>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {post?.img && (
            <div
              className="w-full h-[400px] lg:h-[500px] relative cursor-zoom-in"
              onClick={() => setIsImageFullScreen(true)}
            >
              <Image
                src={post.img}
                alt={post.title || "Post Image"}
                fill
                className="object-contain w-full h-full transition-transform duration-300 hover:scale-105 rounded-t-xl"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold">{post?.title}</h2>
            <div className="prose max-w-none text-gray-800">{parse(post?.content || "")}</div>
          </div>
        </div>
      </div>
    </Tocenter>
  );
};

// Disable SSR for this dynamic import
const Post = dynamic(() => Promise.resolve(PostComponent), { ssr: false });

export default Post;
