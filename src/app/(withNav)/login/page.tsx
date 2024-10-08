"use client";

import AuthenticationBg from "@/components/Helper/AuthenticationBg";
import Button from "@/components/Shared/Button/Button";
import InputField from "@/components/Shared/InputField/InputField";
import { useLoginMutation } from "@/Redux/api/api";
import { setUser } from "@/Redux/featcher/AuthSlice";
import { useAppDispatch } from "@/Redux/hoocks/Convaying";
import { getToken } from "@/utils/getToken";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Login = () => {

  const dispatch=useAppDispatch()
  const[login,{data,error}]=useLoginMutation()


const move=useRouter()

  const formSubmitHandle = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    login({ email, password })
    .then((res) => {
      if (res?.error?.status) return;
      dispatch(setUser(null));
      localStorage.setItem("token", res.data.token);

      axios
        .get(`${process.env.NEXT_PUBLIC_BACK_END_URL as string}/auth/getCurrentUser`,
          {
            headers: {
              authorization: getToken(),
            },
          }
        )
        .then((res) => {
          dispatch(setUser(res.data.data));
          move.push("/");
        });

      form.reset();
    })
    .catch((err) => console.log(err, "error."));
  };

   // show necessary errors.
   useEffect(() => {
    // error messages
    if (error)
      toast.error(error?.data?.message, {
        position: "top-center",
      });
  }, [error]);

  // show necessary response.
  useEffect(() => {
    if (data) {
      toast.success(data.message, {
        position: "top-center",
      });
    }
  }, [data]);


  return (
    <AuthenticationBg>
      <div className="lg:w-[500px] px-6 py-8 h-[500px] rounded-3xl bg-white">
        <h1 className="text-5xl font-semibold">Login</h1>
        <p className="font-semibold mt-5 mb-4">
          Doesn't have an account yet?{" "}
          <Link className="underline text-green-400" href={"/signup"}>
            Sign Up
          </Link>
        </p>
        <form onSubmit={formSubmitHandle} className="mt-12">
          <InputField name="email" className="border-2" placeholder="E-mail" type="email" />
          <div className="mt-4">
            <InputField
              className="border-2"
              placeholder="Password"
              type="password"
              name="password"
            />
          </div>
          <p className="text-right mt-4 font-semibold">
            <Link
              className="text-green-400 underline"
              href={"/forget-password"}
            >
              Forget password
            </Link>
          </p>
          <Button className="w-full mt-5" text="Login" />
        </form>
      </div>
    </AuthenticationBg>
  );
};

export default Login;
