import Image from 'next/image';
import React from 'react';
import "./style.css";

const ContentImage = ({ link }: { link: string }) => {
  return (
    <div className='w-full h-[400px] lg:h-[500px] relative overflow-hidden'>
      <Image
        src={link}
        alt="Post Image"
        width={1920}
        height={1080}
        className=" w-full h-full object-cover scale-150  transition-transform duration-500"
      />
      <div className='postBlurContainer w-full h-full  absolute top-0 right-0'></div>
      <Image
        src={link}
        alt="Post Image"
        width={1920}
        height={1080}
        className="w-full h-full absolute top-0 left-0 lg:h-[500px] object-contain transition-transform duration-500"
      />
    </div>

  );
};

export default ContentImage;