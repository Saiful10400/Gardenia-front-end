import React from 'react';

const Tocenter = ({children}) => {
    return (
        <div className='lg:max-w-[1400px] mx-auto'>
            {children}
        </div>
    );
};

export default Tocenter;