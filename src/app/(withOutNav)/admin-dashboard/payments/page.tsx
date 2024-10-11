"use client"

import DashboardPaymentCard from "@/components/WithoutNav/Shared/DashboardPaymentCard/DashboardPaymentCard";
import { useAllPaymentHistoryQuery } from "@/Redux/api/api";

const Payment = () => {
const {data:transectionData}=useAllPaymentHistoryQuery(null)
console.log(transectionData)
    return (
        <div>
            

<div className="grid grid-cols-4 gap-4">
{transectionData?.data?.map((item,idx)=><DashboardPaymentCard key={idx} data={item}/>)}
</div>


        </div>
    );
};

export default Payment;