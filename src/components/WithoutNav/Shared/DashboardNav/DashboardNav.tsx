import { Bell } from 'lucide-react';
import React from 'react';

const DashboardNav = () => {
    return (
        <div className='flex justify-between h-full px-6 pr-16 items-center '>
           <h1 className='font-bold text-3xl text-green-700'>Admin Dashboard</h1>
           <div className='flex items-center gap-4'>
            <button><Bell/></button>
            <button><Bell/></button>
           </div>
        </div>
    );
};

export default DashboardNav;