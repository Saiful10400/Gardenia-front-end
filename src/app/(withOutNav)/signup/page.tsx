"use client";

import AuthenticationBg from "@/components/Helper/AuthenticationBg";
import Button from "@/components/Component/Button/Button";
import InputField from "@/components/Component/InputField/InputField";
import { useSignupMutation } from "@/Redux/api/api";
import imageUpload from "@/utils/imageUpload";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoCameraSharp } from "react-icons/io5";
import { toast } from "react-toastify";

const Signup = () => {
 
  const [profileImage, setProfileImage] = useState(null);
  const [isProfileImageUploading, setIsProfileImageUploading] = useState(false);

  const profileImageUploadHandle = (e) => {
    const files = e.target.files;
    setIsProfileImageUploading(true);
    imageUpload(files)
      .then((res) => {
        setProfileImage(res[0]);
        setIsProfileImageUploading(false);
      })
      .catch(() => {
        toast.error("Unsupported Profile image file format!", {
          position: "top-center",
        });
        setIsProfileImageUploading(false);
      });
  };

  const [signup, { error, data }] = useSignupMutation();

  const formSubmitHandle = (e) => {
    e.preventDefault();
    if (!profileImage) {
      return toast.error("You have to upload a profile image.", {
        position: "top-center",
      });
    }
    const form = e.target;

    const formData = {
      name: form.name.value,
      img: profileImage,
      email: form.email.value,
      password: form.password.value,
      phone: form.phone.value,
    };

    signup(formData).then(() => {
      setProfileImage(null);
      form.reset();
    });
  };

  const router = useRouter();

  useEffect(() => {
    if (data) {
      toast.success(data?.message, { position: "top-center" });
      router.push("/login");
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message, { position: "top-center" });
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <AuthenticationBg>
        <div className="lg:w-[480px] w-full px-8 py-10 rounded-3xl bg-white shadow-2xl border border-gray-100 flex flex-col items-center animate-fadeIn">
          {/* Header */}
          <h1 className="text-4xl font-bold text-[#26a82c] mb-2">Create Account</h1>
          <p className="text-gray-600 mb-6 text-center">
            Already have an account?{" "}
            <Link className="text-[#26a82c] font-semibold hover:underline" href="/login">
              Login
            </Link>
          </p>

          {/* Profile Upload */}
          <div className="flex justify-center mb-8">
            <label
              htmlFor="profileImg"
              className="relative flex justify-center items-center overflow-hidden flex-col cursor-pointer
              bg-[#26a82c] text-white h-[120px] w-[120px] rounded-full border-4 border-white shadow-lg
              hover:shadow-2xl transition-all"
            >
              {profileImage && !isProfileImageUploading ? (
                <Image
                  width={120}
                  height={120}
                  className="w-full h-full object-cover"
                  src={profileImage}
                  alt="profile image"
                />
              ) : isProfileImageUploading ? (
                <span className="loading loading-spinner text-white loading-lg"></span>
              ) : (
                <>
                  <IoCameraSharp className="text-4xl mb-1" />
                  <span className="text-xs font-semibold">Upload Photo</span>
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

          {/* Form */}
          <form onSubmit={formSubmitHandle} className="w-full flex flex-col gap-4">
            <InputField
              className="border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#26a82c] p-3 transition"
              placeholder="Full Name"
              type="text"
              name="name"
            />
            <InputField
              className="border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#26a82c] p-3 transition"
              placeholder="Email Address"
              type="email"
              name="email"
            />
            <InputField
              className="border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#26a82c] p-3 transition"
              placeholder="Phone Number"
              type="number"
              name="phone"
            />
            <InputField
              className="border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#26a82c] p-3 transition"
              placeholder="Password"
              type="password"
              name="password"
            />

            <Button
              className="w-full mt-5 bg-[#26a82c] hover:bg-[#1e8a24] text-white font-semibold rounded-xl py-3 shadow-lg transition-all"
              text="Signup"
            />
          </form>
        </div>
      </AuthenticationBg>

      {/* Fade-in Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Signup;
