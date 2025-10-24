"use client";

import AuthenticationBg from "@/components/Helper/AuthenticationBg";
import Button from "@/components/Component/Button/Button";
import InputField from "@/components/Component/InputField/InputField";
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


  const formSubmitHandle = (e) => {
    e.preventDefault();
    const { email, password } = loginCredentials;

    login({ email, password })
      .then((res) => {
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
      .catch((err) => console.log(err, "error."));
  };

  useEffect(() => {
    if (error) toast.error(error?.data?.message, { position: "top-center" });
  }, [error]);

  useEffect(() => {
    if (data) toast.success(data.message, { position: "top-center" });
  }, [data]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <AuthenticationBg>
        <div className="lg:w-[480px] w-full px-8 py-10 rounded-3xl bg-white shadow-2xl border border-gray-100 animate-fadeIn">
          <h1 className="text-4xl font-bold text-[#26a82c] text-center">Login</h1>
          <p className="text-gray-600 mt-3 mb-6 text-center">
            {"Don't have an account? "}
            <Link className="text-[#26a82c] font-semibold hover:underline" href="/signup">
              Sign Up
            </Link>
          </p>

          <form onSubmit={formSubmitHandle} className="flex flex-col gap-4">
            <InputField
              borderBottom={true} dValue={loginCredentials.email} name="email" className="border-2" placeholder="E-mail" type="email"

            />
            <InputField
              borderBottom={true} dValue={loginCredentials.password} className="border-2" placeholder="Password" type="password" name="password"
            />
            <p className="text-right mt-1">
              <Link className="text-[#26a82c] font-semibold underline" href="/forget-password">
                Forgot Password?
              </Link>
            </p>

            <Button
              loading={isLoading}
              disable={isLoading}
              className="w-full mt-5 bg-[#26a82c] hover:bg-[#1e8a24] text-white font-semibold rounded-xl py-3 shadow-lg transition-all text-lg"
              text="Login"
            />
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 py-4 border-t border-gray-200">
            <h2 className="text-base font-medium mb-2">Demo Credentials</h2>
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  setLoginCredentials({ email: "admin@g.com", password: "admin admin" })
                }
                className="text-white bg-[#26a82c] hover:bg-[#1e8a24] font-semibold px-4 py-1 rounded-md transition"
              >
                Admin
              </button>
              <button
                onClick={() =>
                  setLoginCredentials({ email: "user@g.com", password: "user user" })
                }
                className="text-white bg-[#26a82c] hover:bg-[#1e8a24] font-semibold px-4 py-1 rounded-md transition"
              >
                User
              </button>
            </div>
          </div>
        </div>
      </AuthenticationBg>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Login;
