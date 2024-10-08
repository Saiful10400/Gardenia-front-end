"use client"

import AuthenticationBg from "@/components/Helper/AuthenticationBg";
import Button from "@/components/Shared/Button/Button";
import InputField from "@/components/Shared/InputField/InputField";
import Link from "next/link";
import React, { useState } from "react";

const ForgetPassword = () => {

const [isAuthenticated,setIsAuthenticated]=useState(null)
   
// form submit handle.
const userNameandEmailHandle=(e)=>{
    e.preventDefault()
  setIsAuthenticated(true)
  e.target.reset()
}

// confirm passwrod handle
const confirmPasswordHandle=(e)=>{
    e.preventDefault()
    const form=e.target
}

  return (
    <AuthenticationBg>
      <div className="lg:w-[500px] px-6 py-8 h-[400px] rounded-3xl bg-white">
        <h1 className="text-5xl font-semibold">Forget password</h1>
        {isAuthenticated?
        <form onSubmit={confirmPasswordHandle} className="mt-12">
          <InputField className="border-2" name="newPassword" placeholder="New password" type="password" />
          <div className="mt-4">
          <InputField className="border-2" name="Re-TypenewPassword" placeholder="Re-type new password" type="password" />
          </div>
          <p className="text-right mt-4 font-semibold"></p>
          <Button type={"submit"} className="w-full mt-5" text="Confirm" />
        </form>
        :<form onSubmit={userNameandEmailHandle} className="mt-12">
          <InputField className="border-2" name="userName" placeholder="User name" type="text" />
          <div className="mt-4">
            <InputField
              className="border-2"
              placeholder="E-mail"
              type="email"
              name="email"
            />
          </div>
          <p className="text-right mt-4 font-semibold"></p>
          <Button type={"submit"} className="w-full mt-5" text="Next" />
        </form>}
      </div>
    </AuthenticationBg>
  );
};

export default ForgetPassword;
