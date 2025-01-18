"use client";

import AuthenticationBg from "@/components/Helper/AuthenticationBg";
import Button from "@/components/Shared/Button/Button";
import InputField from "@/components/Shared/InputField/InputField";
import {
  useChangePasswordMutation,
  useCheckCredentialsMutation,
} from "@/Redux/api/api";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authinticatedEmail,setAuthenticatedEmail]=useState(null)

  // checking apis.(rtk)
  const [checkCredentials, { isLoading:credentialsLoading }] = useCheckCredentialsMutation();
  const [updatePassword, { error: updateError, data: updateData }] =
    useChangePasswordMutation();
  // form submit handle.
  const userNameandEmailHandle = (e) => {
    e.preventDefault();
    const form = e.target;
    const payload = {
      email: form.email.value,
      name: form.name.value,   
    };

    checkCredentials(payload).then((res) => {
      if (res.data.data.credential) {
        setIsAuthenticated(true);
        setAuthenticatedEmail(payload.email)
        e.target.reset();
      } else {
        toast.error("wrong credential!", {
          position: "top-center",
        });
      }
    });
  };

  const route=useRouter()
  // confirm passwrod handle
  const confirmPasswordHandle = (e) => {
    e.preventDefault();
    
    if(!authinticatedEmail) return
    const form = e.target;
    const password=form.newPassword.value
    const re_password=form.Re_TypenewPassword.value

    if(password===re_password){
     updatePassword({email:authinticatedEmail,password}).then(res=>{
      if(res.data.data.modifiedCount>0){
        toast.success("Password Recovered Please Login.", {
          position: "top-center",
        });
        route.push("/login")
        form.reset()
      }
     })
    }else{
      toast.error("Password doesn't match!", {
        position: "top-center",
      });
    }
    
  };

  return (
    <AuthenticationBg>
      <div className="lg:w-[500px] px-6 py-8 h-[400px] rounded-3xl bg-white">
        <h1 className="text-5xl font-semibold">Forget password</h1>
        {isAuthenticated ? (
          <form onSubmit={confirmPasswordHandle} className="mt-12">
            <InputField
              className="border-2"
              name="newPassword"
              placeholder="New password"
              type="password"
            />
            <div className="mt-4">
              <InputField
                className="border-2"
                name="Re_TypenewPassword"
                placeholder="Re-type new password"
                type="password"
              />
            </div>
            <p className="text-right mt-4 font-semibold"></p>
            <Button type={"submit"} className="w-full mt-5" text="Confirm" />
          </form>
        ) : (
          <form onSubmit={userNameandEmailHandle} className="mt-12">
            <InputField
              className="border-2"
              name="name"
              placeholder="User name"
              type="text"
            />
            <div className="mt-4">
              <InputField
                className="border-2"
                placeholder="E-mail"
                type="email"
                name="email"
              />
            </div>
            <p className="text-right mt-4 font-semibold"></p>
            <Button loading={credentialsLoading} type={"submit"} className="w-full mt-5" text="Next" />
          </form>
        )}
      </div>
    </AuthenticationBg>
  );
};

export default ForgetPassword;
