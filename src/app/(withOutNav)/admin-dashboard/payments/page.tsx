"use client"

import DashboardTable from "@/components/ui/DashboardTable";
 
import { TtableData } from "@/Types";

const Payment = () => {
 
 const tableData: TtableData = {
    name: "payments",
    tittle: "All Payments",
    createRoute: " ",
    keyValue: {
      "Transection Id": "tnxId",
      "Amount": "amount",
      "Currency":"currency",
      "Payment Method":"paymentMethod",
      "Transection Date":"createdAt"
       
    },
  };

 
  return  <DashboardTable data={tableData}/>
};

export default Payment;