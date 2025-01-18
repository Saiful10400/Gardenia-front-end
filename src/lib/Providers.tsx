"use client"

import store from "@/Redux/store";
import Aos from "aos";
import React, { useEffect } from "react";
import { Provider } from "react-redux";

const Providers = ({children}:{children:React.ReactChild}) => {


    useEffect(() => {
       
        Aos.init({ duration: 300 });
      }, []);


    return (
        <Provider store={store}>{children}</Provider>
    )
};

export default Providers; 