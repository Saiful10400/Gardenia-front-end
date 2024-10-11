import AdminAside from '@/components/WithoutNav/Admin-dashboard/Asidenav/AdminAside';
import DashboardNav from '@/components/WithoutNav/Shared/DashboardNav/DashboardNav';
import React from 'react';

const layout = ({children}) => {
    return (
       <div className='bg-gray-300'>
        <nav className=' w-full bg-white h-[80px] shadow-lg '>
            <DashboardNav/>
        </nav>

        <section className='flex'>
            <aside className='w-[13%] bg-white sticky top-[80px] h-[calc(100vh-80px)] flex items-start'>
                <AdminAside/>
            </aside>


            <div className='w-[87%] px-16 pt-11'>
                {children}
            </div>


        </section>
       </div>
    );
};

export default layout;