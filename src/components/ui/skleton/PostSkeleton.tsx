import React from 'react';

const PostSkeleton = () => {
    return (
        <div className="flex   flex-col gap-4 shadow-md rounded-2xl">
            <div className="px-4">
                <div className="flex items-center gap-4 px-4">
                    <div className="skeleton h-12 w-12 shrink-0 rounded-full"></div>
                    <div className="flex flex-col gap-4">
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-3 w-20"></div>
                    </div>
                </div>
                <div className='flex flex-col gap-2 mt-5'>
                    <div className="skeleton h-3 w-full rounded-none"></div>
                    <div className="skeleton h-3 w-full rounded-none"></div>
                    <div className="skeleton h-3 w-full rounded-none"></div>
                </div>
            </div>



            <div className="skeleton h-52 w-full mt-2"></div>

        </div>
    );
};

export default PostSkeleton;