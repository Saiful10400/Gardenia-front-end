import React from "react";
import "./css/authenticationBg.css";
import AuthenticationBloobs from "../ui/svgs/AuthenticationBloobs";
const AuthenticationBg = ({ children }) => {
  return children
  return (
    <div className="AuthContainer h-[100vh] border border-pink-600">
      <AuthenticationBloobs style="bg-transparent absolut top-0 right-0 width-[400px] " />

      <div className="w-full h-full relative z-20 flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default AuthenticationBg;
