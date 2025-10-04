"use client"
import DashboardUserDetailsCard from '@/components/Component/Dashboard/Shared/DashboardUserCard/DashboardUserDetailsCard';
import { useGetAllUserQuery } from '@/Redux/api/api';


const User = () => {
    const {data:allUserData}=useGetAllUserQuery(null)

    return (
        <div>
            
            <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
                {allUserData?.data?.map(item=><DashboardUserDetailsCard key={item?._id} data={item}/>)}
            </div>
        </div>
    );
};

export default User;