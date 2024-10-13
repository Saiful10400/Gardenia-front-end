import Tocenter from '@/components/Helper/Tocenter';
import Banner from '@/components/Page/Home/Banner';
import NewsFeedCard from '@/components/Shared/NewsFeedCard/NewsFeedCard';
import React from 'react';

const Home = () => {
    return (
        <Tocenter>
            <Banner/>

<div className='flex flex-col lg:flex-row mt-4 justify-start'>
   <div className='w-[60%]'>
   <NewsFeedCard/>
   </div>
    <div className='border w-[40%] border-black'>
        sorting prt
    </div>
</div>

        </Tocenter>
    );
};

export default Home;