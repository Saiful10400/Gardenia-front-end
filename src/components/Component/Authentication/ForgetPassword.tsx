"use client";

import AuthenticationBg from "@/components/Helper/AuthenticationBg";
import Button from "@/components/Component/Button/Button";
import InputField from "@/components/Component/InputField/InputField";
import { useCheckCredentialsMutation } from "@/Redux/api/api";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authenticatedEmail, setAuthenticatedEmail] = useState(null);

  const [checkCredentials, { isLoading: credentialsLoading }] = useCheckCredentialsMutation();
  // const [updatePassword, { error: updateError, data: updateData }] = useChangePasswordMutation();
  const router = useRouter();

  const userNameAndEmailHandle = (e) => {
    e.preventDefault();
    const form = e.target;
    const payload = {
      email: form.email.value,
      name: form.name.value,
    };

    checkCredentials(payload).then((res) => {
      if (res.data.data.credential) {
        setIsAuthenticated(true);
        setAuthenticatedEmail(payload.email);
        form.reset();
      } else {
        toast.error("Wrong credentials!", { position: "top-center" });
      }
    });
  };

  const confirmPasswordHandle = (e) => {
    e.preventDefault();
    if (!authenticatedEmail) return;
    const form = e.target;
    const password = form.newPassword.value;
    const re_password = form.Re_TypenewPassword.value;

    if (password === re_password) {
      updatePassword({ email: authenticatedEmail, password }).then((res) => {
        if (res.data.data.modifiedCount > 0) {
          toast.success("Password recovered. Please login.", { position: "top-center" });
          router.push("/login");
          form.reset();
        }
      });
    } else {
      toast.error("Passwords do not match!", { position: "top-center" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <AuthenticationBg>
        <div className="lg:w-[480px] w-full px-8 py-10 rounded-3xl bg-white shadow-2xl border border-gray-100 animate-fadeIn">
          <h1 className="text-4xl font-bold text-[#26a82c] text-center">Forget Password</h1>

          {isAuthenticated ? (
            <form onSubmit={confirmPasswordHandle} className="mt-8 flex flex-col gap-4">
              <InputField
                className="border-2 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#26a82c] transition"
                name="newPassword"
                placeholder="New Password"
                type="password"
              />
              <InputField
                className="border-2 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#26a82c] transition"
                name="Re_TypenewPassword"
                placeholder="Re-type New Password"
                type="password"
              />
              <Button type="submit" className="w-full mt-5 bg-[#26a82c] hover:bg-[#1e8a24] text-white font-semibold rounded-xl py-3 shadow-lg transition-all" text="Confirm" />
            </form>
          ) : (
            <form onSubmit={userNameAndEmailHandle} className="mt-8 flex flex-col gap-4">
              <InputField
                borderBottom={true}

                name="name"
                placeholder="User Name"
                type="text"
              />
              <InputField
                borderBottom={true}

                name="email"
                placeholder="Email Address"
                type="email"
              />
              <Button
                loading={credentialsLoading}
                type="submit"
                className="w-full mt-5 bg-[#26a82c] hover:bg-[#1e8a24] text-white font-semibold rounded-xl py-3 shadow-lg transition-all"
                text="Next"
              />
            </form>
          )}
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

export default ForgetPassword;
