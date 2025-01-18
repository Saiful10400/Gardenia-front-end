"use client"

import Tocenter from '@/components/Helper/Tocenter';
import { useAllPostImageQuery } from '@/Redux/api/api';
import React from 'react';
import { Gallery } from 'react-grid-gallery';

const GAlary = () => {

    const{data}=useAllPostImageQuery(null)
    const postImages=data?.data
   const sortedImages=postImages?.map(item=>{
    return{src:item.img,width:340,height:178}
   })
 





    return (
       <Tocenter>
        <div>
        <Gallery images={sortedImages} />
        </div>
       </Tocenter>
    );
};

export default GAlary;