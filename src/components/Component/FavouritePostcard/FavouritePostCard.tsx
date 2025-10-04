import Image from 'next/image';
// import Link from 'next/link';
import React from 'react';
import blueTick from "../../../assets/profile/blueTick.png"
import parser from "html-react-parser"
const FavouritePostCard = ({data}) => {
    
    return (
        <div className='shadow-md   bg-gray-300 rounded-xl p-3'>
        
        <div className="flex items-start  gap-2">
            <Image
              src={data?.postId?.creator?.img}
              alt="postImage"
              width={100}
              height={100}
              className="w-[40px] h-[40px] rounded-full"
            />
            <div>
              <div className="font-bold text-base flex items-end gap-1 ">
                <span> {data?.postId?.creator?.name}</span>{" "}
                {data?.userId?.verifyed && (
                  <Image
                    className="w-[20px]  h-[20px] box-content"
                    src={blueTick}
                    width={200}
                    height={200}
                    alt="blueTick"
                  />
                )}
               
              </div>
              <h1 className="font-semibold flex gap-2 items-end text-gray-700 text-[14px]">
                <span>10h</span>{" "}
                <span className="font-normal">{data?.postId?.costing}</span>
              </h1>
            </div>
          </div>

          <h1>{parser(data?.postId?.content.slice(0,50)||"")}...</h1>
          <Image
              src={data?.postId?.img}
              alt="postImage"
              width={500}
              height={500}
              className="w-full rounded-md object-cover h-[200px]"
            />
        </div>
    );
};

export default FavouritePostCard;