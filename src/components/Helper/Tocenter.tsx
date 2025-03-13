import React from 'react';

const Tocenter = ({children}:{children:React.ReactNode}) => {
    return (
        <div className='bg-[#f2f4f7]'>
            {children}
        </div>
    );
};

export default Tocenter;