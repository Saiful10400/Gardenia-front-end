"use client";

import { useSignupMutation } from "@/Redux/api/api";
import { imageUploadToDb } from "@/utils/imageUpload";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoCameraSharp } from "react-icons/io5";
import { toast } from "react-toastify";

const Signup = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isProfileImageUploading, setIsProfileImageUploading] = useState(false);

  const profileImageUploadHandle = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsProfileImageUploading(true);

    try {
      const url = await imageUploadToDb(file);
      setProfileImage(url);
    } catch {
      toast.error("Unsupported Profile image file format!", { position: "top-center" });
    } finally {
      setIsProfileImageUploading(false);
    }
  };

  const [signup, { error, data, isLoading }] = useSignupMutation();
  const router = useRouter();

  const formSubmitHandle = (e: any) => {
    e.preventDefault();

    if (!profileImage) {
      return toast.error("You have to upload a profile image.", { position: "top-center" });
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

  useEffect(() => {
    if (data) {
      toast.success(data?.message, { position: "top-center" });
      router.push("/login");
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error((error as any)?.data?.message, { position: "top-center" });
    }
  }, [error]);

  return (
    <div className="flex min-h-screen bg-[#f6f8f6] dark:bg-[#122014] font-sans text-slate-900 dark:text-slate-100">

      {/* LEFT SIDE FORM */}

      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 xl:px-32 py-12">

        <div className="max-w-md w-full mx-auto">

          {/* LOGO */}

          <div className="flex items-center gap-3 mb-12">
            <div className="bg-[#26a82c] p-2 rounded-lg text-white">
              <span className="material-symbols-outlined text-3xl">hub</span>
            </div>

            <h2 className="text-2xl font-extrabold tracking-tight">
              SocialConnect
            </h2>
          </div>

          {/* HEADING */}

          <div className="mb-10">
            <h1 className="text-4xl font-black mb-3">
              Create Account
            </h1>

            <p className="text-slate-500">
              Join our community and start sharing your ideas.
            </p>
          </div>

          {/* PROFILE IMAGE */}

          <div className="flex justify-center mb-8">

            <label
              htmlFor="profileImg"
              className="relative flex flex-col items-center justify-center cursor-pointer
              bg-[#26a82c] text-white h-[120px] w-[120px] rounded-full border-4 border-white shadow-lg hover:shadow-2xl transition-all"
            >
              {profileImage && !isProfileImageUploading ? (
                <Image
                  width={120}
                  height={120}
                  src={profileImage}
                  alt="profile image"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : isProfileImageUploading ? (
                <span className="loading loading-spinner text-white loading-lg"></span>
              ) : (
                <>
                  <IoCameraSharp className="text-4xl mb-1" />
                  <span className="text-xs font-semibold">
                    Upload Photo
                  </span>
                </>
              )}
            </label>

            <input
              type="file"
              accept="image/*"
              id="profileImg"
              onChange={profileImageUploadHandle}
              className="hidden"
            />

          </div>

          {/* FORM */}

          <form onSubmit={formSubmitHandle} className="space-y-5">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full py-4 px-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#26a82c] outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full py-4 px-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#26a82c] outline-none"
            />

            <input
              type="number"
              name="phone"
              placeholder="Phone Number"
              className="w-full py-4 px-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#26a82c] outline-none"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full py-4 px-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#26a82c] outline-none"
            />

            <button
              disabled={isLoading}
              className="w-full bg-[#26a82c] hover:bg-[#1e8a24] text-white font-bold py-4 rounded-xl shadow-lg transition-all"
            >
              {isLoading ? "Creating..." : "Signup"}
            </button>

          </form>

          {/* LOGIN LINK */}

          <div className="mt-8 text-center">

            <p className="text-slate-500">
              Already have an account?

              <Link
                href="/login"
                className="text-[#26a82c] font-bold hover:underline ml-1"
              >
                Login
              </Link>

            </p>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE DEMO POST */}

      <div className="hidden lg:flex w-1/2 bg-[#26a82c]/10 items-center justify-center p-12 relative overflow-hidden">

        <div className="absolute top-0 right-0 w-96 h-96 bg-[#26a82c]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#26a82c]/10 rounded-full blur-2xl"></div>

        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl border p-6 z-10">

          <div className="flex items-center gap-3 mb-4">
            <img
              src="https://i.pravatar.cc/150?img=12"
              className="w-12 h-12 rounded-full"
            />

            <div>
              <p className="font-bold">Emma Stone</p>
              <p className="text-xs text-gray-400">
                1 hour ago
              </p>
            </div>
          </div>

          <p className="text-gray-600 mb-4">
            Excited to join this amazing developer community. Let's build something great together 🚀
          </p>

          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            className="rounded-xl mb-4"
          />

          <div className="flex gap-6 text-gray-500">
            <span>❤️ 980</span>
            <span>💬 65</span>
            <span>🔁 9</span>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Signup;