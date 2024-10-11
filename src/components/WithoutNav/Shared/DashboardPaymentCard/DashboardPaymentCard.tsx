import React from 'react';

const DashboardPaymentCard = ({data}) => {
    return (
        <div data-aos="zoom-in" className='bg-white shadow-xl p-3 rounded-lg'>
            <h1 className='text-base font-bold'>Transection Id: <span className=' font-semibold text-sm'>{data.tnxId}</span></h1>
            <h1 className='text-base font-bold mt-1'>Amount: <span className=' font-semibold '>{data.amount} $</span></h1>
            <h1 className='text-base font-bold mt-1'>Payment Method: <span className=' font-semibold '>{data.paymentMethod}</span></h1>
            <h1 className='text-base font-bold mt-1'>Subject: <span className=' font-semibold '>Account verification</span></h1>
            <h1 className='text-base font-bold mt-1'>Paid By: <span className=' font-semibold '>{data.userId?.name}</span></h1>
            <h1 className='text-base font-bold mt-1'>Paid E-mail: <span className=' font-semibold '>{data.userId?.email}</span></h1>
       
        </div>
    );
};

export default DashboardPaymentCard;