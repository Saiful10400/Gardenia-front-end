import React, { ReactChild } from 'react';

const layout = ({ children }: { children: ReactChild }) => {
    return (
        <div className='flex justify-between items-start gap-4 '>
            <div className='min-w-[20%] bg-gray-400 lg:min-h-[calc(100vh-72px)]'>
            </div>
            <div className='w-full lg:min-h-[calc(100vh-72px)]  border border-black'>
                {children}
            </div>
        </div>
    );
};

export default layout;