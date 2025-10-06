"use client";

import Heading from "@tiptap/extension-heading";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "next/image";
import React, { useState } from "react";
import { MdPhotoLibrary } from "react-icons/md";
import "./style.css";
import Italic from "@tiptap/extension-italic";
import swal from "sweetalert";
import {
  AlignCenter,
  AlignLeft,
  ImagePlus,
  Italic as ItalicIcon,
  List,
  UnderlineIcon,
} from "lucide-react";
import { Bold as BoldicIcon } from "lucide-react";
import { Heading1 as Headingxl } from "lucide-react";
import { Heading2 as Headingl } from "lucide-react";
import { Heading3 as Headings } from "lucide-react";

import Bold from "@tiptap/extension-bold";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
 
 
import Button from "../Button/Button";
import { toast } from "react-toastify";
import imageUpload from "@/utils/imageUpload";
import { useCreatePostMutation } from "@/Redux/api/api";
import { useAppSelector } from "@/Redux/hoocks/Convaying";
import { Tuser } from "@/Types";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

const PostCreate = ({ userData }: { userData: Tuser }) => {
  // configure rich-text editor.
 
  const editor = useEditor({
    extensions: [
      StarterKit,

      Underline,
      Bold,
      Italic,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      ListItem,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({ placeholder: "Write something …" }),
    ],
    // content:"<p>dsfsd</p>"
  });

  // image upload handle.
  const [postImage, setPostImage] = useState(null);
  const [isPostImageUploading, setIsPostImageUploading] = useState(false);
  const postImageUploadHandle = (e) => {
    const files = e.target.files;
    setIsPostImageUploading(true);
    imageUpload(files)
      .then((res) => {
        setPostImage(res[0]);
        setIsPostImageUploading(false);
      })
      .catch(() => {
        toast.error("Unsupported Profile image file formate!", {
          position: "top-center",
        });
        setIsPostImageUploading(false);
      });
  };

  // submit form.

//# checking if you are in a page.
const currentRoute=usePathname()
//# get current page id.
const searchParams = useSearchParams();
const id = searchParams.get("id");
 

  const [createPost] = useCreatePostMutation();
  const { loggedInUser } = useAppSelector((e) => e.authStore);
  const submitPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!postImage) {
      toast.error("Please upload Image!", {
        position: "top-right",
      });
      return;
    }
    if (!loggedInUser || !editor) {
      return;
    }
    // const form = new FormData(e.currentTarget);   category and costing temporary removed.
    const text = editor.getHTML();
    const postData:{content:string,img:string,creator:string,isGroupPost:boolean,group?:string}={
      content: text,
      img: postImage,
      creator: loggedInUser._id,
      isGroupPost:currentRoute==="/page"
      // category: form.get("category"),
      // costing: form.get("costType"),
    }
    if(currentRoute==="/page") postData.group=id as string
    createPost(postData).then((res) => {
      // clear all stuf
      if (res.data.statusCode === 200) {
        editor.commands.setContent("");
        setPostImage(null);
        // document.getElementById("create_post")?.close();
        swal("Success", "Post Created", "success");
      }
    });
  };

  return (
    <>
      <section className="rounded-xl shadow-md p-3  border bg-white flex justify-evenly items-center">
        <Link href={`/profile?id=${loggedInUser?._id}`}><Image
          className="w-[50px] h-[50px] rounded-full object-cover"
          src={userData?.img}
          width={50}
          height={50}
          alt="profile"
        ></Image></Link>
        <button
          onClick={() => document.getElementById("create_post")?.showModal()}
          className="w-[70%] bg-gray-100 text-base font-medium rounded-3xl py-3 text-start px-4"
        >
          Bloom Your Ideas Here!
        </button>
        <button
          onClick={() => document.getElementById("create_post")?.showModal()}
          className="text-3xl text-[#25a82b] p-2 rounded-full bg-gray-100"
        >
          <MdPhotoLibrary />
        </button>
      </section>

      <dialog id="create_post" className="modal">
        <div className="modal-box lg:max-w-[600px]  overflow-x-hidden">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          {/* rich text editor. */}

          {editor && (
            <section className="mt-5">
              <div>
                {/* upload image. */}

                <label
                  htmlFor="ImagePost"
                  className="relative border border-black w-full flex justify-center items-center h-[200px] rounded-lg mt-4"
                >
                  {isPostImageUploading && (
                    <div className="flex absolute top-0 left-0 bg-[#55555577] items-center justify-center w-full h-full">
                      <span className="loading loading-dots loading-lg"></span>
                    </div>
                  )}
                  {postImage ? (
                    <Image
                      height={200}
                      width={500}
                      src={postImage}
                      alt="PostImage"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    !isPostImageUploading && <ImagePlus size={40} />
                  )}
                  <input
                    onInput={postImageUploadHandle}
                    hidden
                    id="ImagePost"
                    type="file"
                  />
                </label>

                {/* buttons. */}
                <div className="flex items-center gap-3 mb-3 mt-5">
                  <button
                    className={`${
                      editor?.isActive("italic")
                        ? "bg-gray-700 text-white"
                        : "bg-gray-200"
                    } p-1 rounded-md`}
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                  >
                    <ItalicIcon />
                  </button>

                  <button
                    className={`${
                      editor?.isActive("bold")
                        ? "bg-gray-700 text-white"
                        : "bg-gray-200"
                    } p-1 rounded-md`}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                  >
                    <BoldicIcon />
                  </button>

                  <button
                    className={`${
                      editor?.isActive("underline")
                        ? "bg-gray-700 text-white"
                        : "bg-gray-200"
                    } p-1 rounded-md`}
                    onClick={() =>
                      editor.chain().focus().toggleUnderline().run()
                    }
                  >
                    <UnderlineIcon />
                  </button>

                  <button
                    className={`${
                      editor.isActive("heading", { level: 1 })
                        ? "bg-gray-700 text-white"
                        : "bg-gray-200"
                    } p-1 rounded-md`}
                    onClick={() =>
                      editor.chain().focus().toggleHeading({ level: 1 }).run()
                    }
                  >
                    <Headingxl />
                  </button>
                  <button
                    className={`${
                      editor.isActive("heading", { level: 2 })
                        ? "bg-gray-700 text-white"
                        : "bg-gray-200"
                    } p-1 rounded-md`}
                    onClick={() =>
                      editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                  >
                    <Headingl />
                  </button>

                  <button
                    className={`${
                      editor.isActive("heading", { level: 3 })
                        ? "bg-gray-700 text-white"
                        : "bg-gray-200"
                    } p-1 rounded-md`}
                    onClick={() =>
                      editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                  >
                    <Headings />
                  </button>

                  <button
                    className={`${
                      editor.isActive({ textAlign: "left" })
                        ? "bg-gray-700 text-white"
                        : "bg-gray-200"
                    } p-1 rounded-md`}
                    onClick={() =>
                      editor.chain().focus().setTextAlign("left").run()
                    }
                  >
                    <AlignLeft />
                  </button>

                  <button
                    className={`${
                      editor.isActive({ textAlign: "center" })
                        ? "bg-gray-700 text-white"
                        : "bg-gray-200"
                    } p-1 rounded-md`}
                    onClick={() =>
                      editor.chain().focus().setTextAlign("center").run()
                    }
                  >
                    <AlignCenter />
                  </button>

                  <button
                    className={`${
                      editor.isActive("bulletList")
                        ? "bg-gray-700 text-white"
                        : "bg-gray-200"
                    } p-1 rounded-md`}
                    onClick={() =>
                      editor.chain().focus().toggleBulletList().run()
                    }
                  >
                    <List />
                  </button>

                  {/* <button
                    className={`${
                     "bg-gray-200"
                    } p-1 rounded-md`}
                    onClick={() =>
                     editor.chain().focus().undo().run()} disabled={!editor.can().undo()
                    }
                  >
                    <Undo />
                  </button>

                  <button
                    className={`${
                       "bg-gray-200"
                    } p-1 rounded-md`}
                    onClick={() =>
                      editor.chain().focus().redo().run()} disabled={!editor.can().redo()
                    }
                  >
                    <Redo />
                  </button> */}
                </div>

                <div>
                  <EditorContent editor={editor} />
                </div>

                {/* catatory selecion drop downs. */}
                <form onSubmit={submitPost}>
                  {/* <div className="grid grid-cols-2 mt-4 gap-4">
                    <DropDown
                      name="category"
                      placeholder="Select Categorie "
                      values={postCategories}
                    />
                    <DropDown
                      name="costType"
                      placeholder="Post Type"
                      values={PostCosting}
                    />
                  </div> */}
                  <Button className="w-full mt-4" text="Post" />
                </form>
              </div>
            </section>
          )}
        </div>
      </dialog>
    </>
  );
};

export default PostCreate;
