import AdminAside from '@/components/WithoutNav/Admin-dashboard/Asidenav/AdminAside';
import DashboardNav from '@/components/WithoutNav/Shared/DashboardNav/DashboardNav';
import React from 'react';

const layout = ({children}) => {
    return (
       <div className='bg-gray-300 min-h-screen'>
        <nav className=' w-full bg-white h-[80px] shadow-lg '>
            <DashboardNav/>
        </nav>

        <section className='flex'>
            <aside className='lg:w-[13%] w-full hidden bg-white sticky top-[80px] h-[calc(100vh-80px)] lg:flex items-start'>
                <AdminAside/>
            </aside>


            <div className='lg:w-[87%] w-full lg:px-16 px-3 min-h-screen pt-11'>
                {children}
            </div>


        </section>
       </div>
    );
};

export default layout;