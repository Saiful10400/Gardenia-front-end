"use client"

import Image from "next/image";
import parse from "html-react-parser"
import { FilePen, SquareX } from "lucide-react";
import Swal from "sweetalert2";
import { useDeletePostMutation, useUpdatePostMutation } from "@/Redux/api/api";

// .....................................................................................................................................




import Heading from "@tiptap/extension-heading";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
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

import { postCategories, PostCosting } from "@/StaticData/CreatePost";

import { toast } from "react-toastify";
import imageUpload from "@/utils/imageUpload";
import { useCreatePostMutation } from "@/Redux/api/api";
import { useAppSelector } from "@/Redux/hoocks/Convaying";
import DropDown from "@/components/Shared/DropDown/DropDown";
import Button from "@/components/Shared/Button/Button";







// ...................................................................................................................................................



const UserPostCard = ({data}) => {


//post delete handle
const[deletepost]=useDeletePostMutation()
const PosetDeleteHandle=()=>{

    Swal.fire({
        title: "Do you want to delete this post?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "No",
        denyButtonText: `Yes`
      }).then((result) => {
      
        if (!result.isConfirmed) {
        //   delete the post.
        deletepost(data?.post?._id)

        }
      });
}


// update handle.



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
    content:data?.post?.content
  });


  
  // image upload handle.
  const [postImage, setPostImage] = useState(data?.post?.img);
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


  const[updatePost]=useUpdatePostMutation() // with id and other things

  // submit form.
const[createPost]=useCreatePostMutation()
const { loggedInUser, } = useAppSelector(
  (e) => e.authStore
);
  const submitPost=(e)=>{
    e.preventDefault()
    if(!postImage){
      toast.error("Please upload Image!", {
        position: "top-right",
      })
      return
    }
   if(!loggedInUser||!editor){
    return
   }
    const form=e.target
    const text=editor.getHTML()
    updatePost({
      id:data?.post?._id,
      content:text,
      img:postImage,
      category:form.category.value,
      costing:form.costType.value, 
  }).then(res=>{
    console.log(res.data)

    // clear all stuf 
    if(res.data.statusCode===200){
      document.getElementById(data?.post?._id)?.close()
      swal("Success","Post Updated.", "success");
    }
  })



  }




    return (
        <div data-aos="zoom-in" className="bg-white shadow-xl pb-4 overflow-hidden rounded-xl">
            <Image className="w-full h-[200px] object-cover" height={200} width={300} alt="postImage" src={data?.post?.img}/>
            <p className="h-[100px] mt-4 overflow-hidden px-3">
                {parse(data?.post?.content?.slice(0,150)+" "+"....")}
            </p>
            <div className="flex justify-center items-center mt-3 gap-3">
                <button onClick={()=>document.getElementById(data?.post?._id)?.showModal()} className="bg-green-500 p-2 rounded-lg px-4 text-lg font-semibold text-white flex items-center gap-2"><FilePen size={20}/> Edit</button>
                <button onClick={PosetDeleteHandle} className="bg-red-500 p-2 rounded-lg px-4 text-lg font-semibold text-white flex items-center gap-2"><SquareX size={20}/> Delete</button>
            </div>


<dialog id={data?.post?._id} className="modal">
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
                {/* buttons. */}
                <div className="flex items-center gap-3 mb-3">
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

{/* upload image. */}

<label  htmlFor={`Image_post_${data?.post?._id}`} className="relative border border-black w-full flex justify-center items-center h-[200px] rounded-lg mt-4">
  {isPostImageUploading&&<div className="flex absolute top-0 left-0 bg-[#55555577] items-center justify-center w-full h-full">
    <span className="loading loading-dots loading-lg"></span>
    </div>}
  {postImage?<Image height={200} width={500} src={postImage} alt="PostImage" className="w-full h-full object-cover"/>:!isPostImageUploading&&<ImagePlus size={40}/> }
  <input onInput={postImageUploadHandle} hidden id={`Image_post_${data?.post?._id}`} type="file" />
</label>

{/* catatory selecion drop downs. */}
<form onSubmit={submitPost}>
<div className="grid grid-cols-2 mt-4 gap-4">
  <DropDown defaultValue={data?.post?.category} name="category" placeholder="Select Categorie " values={postCategories}/>
  <DropDown defaultValue={data?.post?.costing} name="costType" placeholder="Post Type" values={PostCosting}/>
</div>
<Button className="w-full mt-4" text="Post"/>
</form>

              </div>
            </section>
          )}
        </div>
</dialog>



        </div>
    );
};

export default UserPostCard;