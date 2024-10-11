import Image from "next/image";
import parse from "html-react-parser"
import { FilePen, SquareX } from "lucide-react";
const UserPostCard = ({data}) => {
    return (
        <div data-aos="zoom-in" className="bg-white shadow-xl pb-4 overflow-hidden rounded-xl">
            <Image className="w-full h-[200px] object-cover" height={200} width={300} alt="postImage" src={data?.post?.img}/>
            <p className="h-[100px] mt-4 overflow-hidden px-3">
                {parse(data?.post?.content?.slice(0,150)+" "+"....")}
            </p>
            <div className="flex justify-center items-center mt-3 gap-3">
                <button className="bg-green-500 p-2 rounded-lg px-4 text-lg font-semibold text-white flex items-center gap-2"><FilePen size={20}/> Edit</button>
                <button className="bg-red-500 p-2 rounded-lg px-4 text-lg font-semibold text-white flex items-center gap-2"><SquareX size={20}/> Delete</button>
            </div>
        </div>
    );
};

export default UserPostCard;