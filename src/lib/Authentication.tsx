"use client";

import { useEffect } from "react";
import axios from "axios";
import { getToken } from "@/utils/getToken";
import { useAppDispatch, useAppSelector } from "@/Redux/hoocks/Convaying";
import { setUser } from "@/Redux/featcher/AuthSlice";
// import { socket } from "@/Wsocket";
import { Tuser } from "@/Types";
import { socket } from "@/Wsocket";

const Authentication = ({ children }: { children: React.ReactChild }) => {
  const { loggedInUser }: { loggedInUser: Tuser | null } = useAppSelector(
    (e) => e.authStore
  );

  const dispatch = useAppDispatch();
  // get logged in user credentials and update state.
  useEffect(() => {
    if (!getToken()) {
      dispatch(setUser(null));
      return;
    }

    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACK_END_URL as string}/auth/getCurrentUser`,
        {
          headers: {
            authorization: getToken(),
          },
        }
      )
      .then((res) => {
        if (res.data.data.email !== loggedInUser?.email) {
          dispatch(setUser(res.data.data));
        }
      })
      .catch((err) => {
        if (err.status !== 200) {
          dispatch(setUser(null));
        }
      });
  }, [loggedInUser, dispatch]);

  useEffect(() => {

    if(loggedInUser){
      
      socket.emit("connection",{_id:loggedInUser._id,email:loggedInUser.email})
    }

  }, [loggedInUser]);



  return children;
};

export default Authentication;
