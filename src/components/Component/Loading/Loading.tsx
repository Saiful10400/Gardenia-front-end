import React from 'react';
import loader from "../../../assets/pages/loading/loading.gif"
import Image from 'next/image';

const Loading = () => {
    return (
        <div className='min-h-[70vh] flex items-center justify-center'>
            <Image className='w-[500px]' alt='Loading' src={loader} height={200} width={200}></Image>
        </div>
    );
};

export default Loading;