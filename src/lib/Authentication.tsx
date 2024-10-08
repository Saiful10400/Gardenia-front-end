"use client"

import { useEffect } from "react";
import axios from "axios";
import { getToken } from "@/utils/getToken";
import { useAppDispatch } from "@/Redux/hoocks/Convaying";
import { setUser } from "@/Redux/featcher/AuthSlice";

const Authentication = ({children}) => {

    const dispatch=useAppDispatch()
    // get logged in user credentials and update state.
    useEffect(() => {

        if(!getToken()){
             dispatch(setUser(null))
             return
        }
      
      axios.get(`${process.env.NEXT_PUBLIC_BACK_END_URL as string}/auth/getCurrentUser`, {
        headers: {
          authorization: getToken() ,
        }
      }).then(res=>{
        
        dispatch(setUser(res.data.data))
    
      }).catch(err=>{
        if(err.status!==200){
            dispatch(setUser(null))
        }
      })
    }, []);


    return (
        children
    );
};

export default Authentication;