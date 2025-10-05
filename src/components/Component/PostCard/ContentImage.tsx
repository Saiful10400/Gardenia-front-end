import Image from 'next/image';
import React from 'react';

const ContentImage = ({link}:{link:string}) => {
    return (
        <Image
          src={link}
          alt="Post Image"
          width={1920}
          height={1080}
          className="w-full h-[400px] lg:h-[500px] object-contain rounded-b-xl hover:scale-105 transition-transform duration-500"
        />
    );
};

export default ContentImage;