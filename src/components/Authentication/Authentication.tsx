"use client"
import { useAppSelector } from "@/Redux/hoocks/Convaying";
import { Tuser } from "@/Types";
import { usePathname } from "next/navigation";
import React from "react";
import ForgetPassword from "../ForgetPassword";
import Signup from "../Signup";
import Loading from "../Shared/Loading/Loading";
import Login from "../Login";
import {NextUIProvider} from '@nextui-org/react'

const AuthenticateRoute = ({children}:{children:React.ReactNode}) => {
    const {
        loggedInUser,
        isLoading,
      }: { loggedInUser: Tuser | null; isLoading: boolean } = useAppSelector(
        (e) => e.authStore
      );
      
      const permittedPath=["/forget-password","/signup"]
    
      const url=usePathname()
      
     
    
      if (url===permittedPath[0]) {
        return <ForgetPassword />;
      }
      if (url===permittedPath[1]) {
        return <Signup />;
      }
      if (!loggedInUser && isLoading) {
        return <Loading />;
      }
      if (!loggedInUser && !isLoading) {
        return <Login/>;
      }
      if (loggedInUser && !isLoading) {
        return (
          <NextUIProvider>
            {children}
            </NextUIProvider>
        );
      }
};

export default AuthenticateRoute;