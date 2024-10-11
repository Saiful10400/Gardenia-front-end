import Image from 'next/image';
import React from 'react';
import blueTick from "../../../../assets/profile/blueTick.png"
import Button from '@/components/Shared/Button/Button';
import { useUpdateAUserMutation } from '@/Redux/api/api';
const DashboardUserDetailsCard = ({data}) => {

// role update hadle.
const[userUpdate]=useUpdateAUserMutation()


const handleRole=()=>{
userUpdate({id:data._id,role:data.role==="user"?"admin":"user"})
}

const blockingHandle=()=>{
userUpdate({id:data._id,isBlocked:data.isBlocked?false:true})
}



    return (
        <div data-aos="zoom-in" className='bg-white pb-5 rounded-lg overflow-hidden'>
            <Image height={300} width={400} className='w-full h-[100px] object-cover' alt='cover' src={data.coverImg}/>

            <section className='flex flex-col h-[140px] items-center justify-center relative bottom-8'>
            <Image height={300} width={400} className='w-[100px]  h-[100px] rounded-full object-cover' alt='cover' src={data.img}/>
            <div className=''>
            <h1 className='font-bold text-xl inline-block'>{data.name}</h1>
            {data.verifyed&&<Image height={300} width={400} className='w-[30px] inline-block h-[30px] rounded-full object-cover' alt='cover' src={blueTick}/>}
            </div>
            <h1 className='font-normal text-lg'>{data.email}</h1>
            
            </section>
            <section className='px-4'>
                <h1 className='text-lg font-semibold'>Role: <span className='font-normal'>{data.role}</span></h1>
                <h1 className='text-lg font-semibold'>Status: <span className='font-normal'>{data.isBlocked?"Blocked":"Un-Blocked"}</span></h1>
                <h1 className='text-lg font-semibold'>Address: <span className='font-normal'>{data.address}</span></h1>
                <h1 className='text-lg font-semibold'>Phone: <span className='font-normal'>{data.phone}</span></h1>
            </section>
            
            <section className='flex items-center justify-center gap-4 mt-4'>
                {/* buttons. */}
                <Button onClick={handleRole} className='rounded-sm p-1 font-semibold' text={data.role==="user"?"Make Admin":"Make User"}/>
                <Button onClick={blockingHandle} className='rounded-sm px-5 font-semibold bg-red-500' text={data.isBlocked?"Un-Block":"Block"}/>
            </section>
        </div>
    );
};

export default DashboardUserDetailsCard;