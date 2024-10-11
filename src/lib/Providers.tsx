"use client"

import store from "@/Redux/store";
import Aos from "aos";
import { useEffect } from "react";
import { Provider } from "react-redux";


const Providers = ({children}) => {


    useEffect(() => {
        Aos.init({ duration: 300 });
      }, []);


    return (
        <Provider store={store}>{children}</Provider>
    )
};

export default Providers; 