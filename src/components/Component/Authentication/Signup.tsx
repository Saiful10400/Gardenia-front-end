"use client";

import AuthenticationBg from "@/components/Helper/AuthenticationBg";
import Button from "@/components/Component/Button/Button";
import InputField from "@/components/Component/InputField/InputField";
import { useSignupMutation } from "@/Redux/api/api";
import  { imageUploadToDb } from "@/utils/imageUpload";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoCameraSharp } from "react-icons/io5";
import { toast } from "react-toastify";
const Signup = () => {
    
  // profile image upload handle.
  const [profileImage, setProfileImage] = useState(null);
  const [isProfileImageUploading, setIsProfileImageUploading] = useState(false);

  const profileImageUploadHandle = async (e) => {
    const files = e.target.files[0];
   
    setIsProfileImageUploading(true);
    try{
      const url=await imageUploadToDb(files)
    setProfileImage(url);
    setIsProfileImageUploading(false);
    }catch{
        toast.error("Unsupported Profile image file formate!", {
          position: "top-center",
        });
        setIsProfileImageUploading(false);
      };
  };

  // form submit handle.
  const [signup,{error,data}]=useSignupMutation()

  const formSubmitHandle = (e) => {
    e.preventDefault();
    if (!profileImage) return toast.error("You have to upload a profile image.", {
        position: "top-center",
      });
    const form = e.target;

    const formData = {
      name: form.name.value,
      img: profileImage,
      email: form.email.value,
      password: form.password.value,
      phone: form.phone.value,
    };

    signup(formData).then(() =>{
        setProfileImage(null)
        form.reset()
    });
  };


  const router=useRouter()

    // show necessary message.
    useEffect(() => {
        if (data) {
          toast.success(data?.message, {
            position: "top-center",
          });
          router.push("/login")
        }
      }, [data]);

    //   show error message.
    useEffect(() => {
        // error messages
        if (error)
          toast.error(error?.data?.message, {
            position: "top-center",
          });
      }, [error]);

     

  return (
    <div>
      <AuthenticationBg>
        <div className="lg:w-[500px] px-6 py-8  rounded-3xl bg-white">
          <h1 className="text-5xl text-center font-semibold">Signup</h1>
          <p className="font-semibold text-center mt-5 mb-4">
            Have an account?{" "}
            <Link className="underline text-green-900" href={"/login"}>
              Login
            </Link>
          </p>

          <div className="flex justify-center items-center mt-5">
            <label
              htmlFor="profileImg"
              className="flex justify-center items-center overflow-hidden flex-col cursor-pointer  bg-gray-500 text-white  h-[100px] rounded-full w-[100px]"
            >
              {profileImage && !isProfileImageUploading ? (
                <Image
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                  src={profileImage}
                  alt="profileiamge"
                />
              ) : isProfileImageUploading ? (
                <span className="loading loading-spinner text-white loading-md"></span>
              ) : (
                <>
                  <IoCameraSharp className="text-3xl" />
                  <span className="w-max text-xs font-semibold">
                    Upload Profile
                  </span>
                </>
              )}
            </label>

            <input
              onInput={profileImageUploadHandle}
              accept="image/*"
              type="file"
              id="profileImg"
              className="hidden"
            />
          </div>

          <form
            onSubmit={formSubmitHandle}
            className="mt-12 flex flex-col gap-4"
          >
            <InputField borderBottom={true}
              className="border-2"
              placeholder="Full name"
              type="text"
              name="name"
            />

            <InputField borderBottom={true}
              className="border-2"
              placeholder="E-mail"
              type="email"
              name="email"
            />
            <InputField borderBottom={true}
              className="border-2"
              placeholder="Phone number"
              type="number"
              name="phone"
            />

            <InputField borderBottom={true}
              className="border-2"
              placeholder="Password"
              type="password"
              name="password"
            />

            <Button className="w-full mt-5" text="Login" />
          </form>
        </div>
      </AuthenticationBg>
    </div>
  );
};

export default Signup;
