"use client";

import { useLoginMutation } from "@/Redux/api/api";
import { setUser } from "@/Redux/featcher/AuthSlice";
import { useAppDispatch } from "@/Redux/hoocks/Convaying";
import { getToken } from "@/utils/getToken";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useAppDispatch();
  const [login, { data, error, isLoading }] = useLoginMutation();
  const router = useRouter();

  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const formSubmitHandle = (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password } = loginCredentials;

    login({ email, password })
      .then((res: any) => {
        if (res?.error) return;

        dispatch(setUser(null));
        localStorage.setItem("token", res.data.token);

        axios
          .get(`${process.env.NEXT_PUBLIC_BACK_END_URL}/auth/getCurrentUser`, {
            headers: { authorization: getToken() },
          })
          .then((res) => {
            dispatch(setUser(res.data.data));
            router.push("/");
          });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (error) toast.error((error as any)?.data?.message, { position: "top-center" });
  }, [error]);

  useEffect(() => {
    if (data) toast.success(data.message, { position: "top-center" });
  }, [data]);

  return (
    <div className="flex min-h-screen bg-[#f6f8f6] dark:bg-[#122014] font-sans text-slate-900 dark:text-slate-100">

      {/* LEFT SIDE LOGIN FORM */}

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
              Welcome Back
            </h1>
            <p className="text-slate-500">
              Connect with your community and see what's happening.
            </p>
          </div>

          {/* FORM */}

          <form onSubmit={formSubmitHandle} className="space-y-6">

            {/* EMAIL */}

            <div>
              <label className="block text-sm font-semibold mb-2">
                Username or Email
              </label>

              <div className="relative">

             

                <input
                  name="email"
                  value={loginCredentials.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="name@example.com"
                  className="w-full min-w-0 pl-14 pr-4 py-4 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-[#26a82c] outline-none transition-all"
                />

              </div>
            </div>

            {/* PASSWORD */}

            <div>

              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold">
                  Password
                </label>

                <Link
                  href="/forget-password"
                  className="text-xs font-bold text-[#26a82c] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="relative">

                 

                <input
                  name="password"
                  value={loginCredentials.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="••••••••"
                  className="w-full min-w-0 pl-14 pr-4 py-4 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-[#26a82c] outline-none transition-all"
                />

              </div>

            </div>

            {/* REMEMBER */}

            <div className="flex items-center">

              <input
                type="checkbox"
                className="rounded border-slate-300 text-[#26a82c] focus:ring-[#26a82c] h-4 w-4"
              />

              <label className="ml-2 text-sm text-slate-500">
                Remember me for 30 days
              </label>

            </div>

            {/* LOGIN BUTTON */}

            <button
              disabled={isLoading}
              className="w-full bg-[#26a82c] hover:bg-[#1e8a24] text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98]"
            >
              {isLoading ? "Logging in..." : "Log In"}
            </button>

          </form>

          {/* DEMO CREDENTIALS */}

          <div className="mt-6 pt-6 border-t border-slate-200">

            <p className="text-sm text-slate-500 mb-3">
              Demo Credentials
            </p>

            <div className="flex gap-3">

              <button
                type="button"
                onClick={() =>
                  setLoginCredentials({
                    email: "admin@g.com",
                    password: "admin admin",
                  })
                }
                className="px-4 py-2 bg-[#26a82c] hover:bg-[#1e8a24] text-white text-sm font-semibold rounded-lg transition"
              >
                Admin
              </button>

              <button
                type="button"
                onClick={() =>
                  setLoginCredentials({
                    email: "user@g.com",
                    password: "user user",
                  })
                }
                className="px-4 py-2 bg-[#26a82c] hover:bg-[#1e8a24] text-white text-sm font-semibold rounded-lg transition"
              >
                User
              </button>

            </div>

          </div>

          {/* SIGNUP */}

          <div className="mt-8 text-center">

            <p className="text-slate-500">
              Don't have an account?

              <Link
                href="/signup"
                className="text-[#26a82c] font-bold hover:underline ml-1"
              >
                Sign Up for free
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
              src="https://i.pravatar.cc/150?img=32"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-bold">Alex Rivers</p>
              <p className="text-xs text-gray-400">2 hours ago</p>
            </div>
          </div>

          <p className="text-gray-600 mb-4">
            Just finished designing the new interface for our green energy project 🌿
          </p>

          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475"
            className="rounded-xl mb-4"
          />

          <div className="flex gap-6 text-gray-500">
            <span>❤️ 1.2k</span>
            <span>💬 84</span>
            <span>🔁 12</span>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;