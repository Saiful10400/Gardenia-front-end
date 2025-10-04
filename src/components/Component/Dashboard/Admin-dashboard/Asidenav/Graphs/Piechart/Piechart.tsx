import React from "react";
import "./style.css";
import { PieChart, Pie, Cell } from "recharts";
const Pycomponent = ({data}:{data:{
  verifyedUser: number;
  unVerifyedUser: number;
}}) => {
  const datas = [
    { name: "Unverified", value: data?.unVerifyedUser ||0 },
    { name: "Verified", value: data?.verifyedUser ||0 },
  ];
  const COLORS = ["#FFBB28", "#FF8042"];

  return (
    <div className="bg-white pb-6 px-5   rounded-xl w-full lg:overflow-hidden overflow-auto">
      <h1 className="text-center text-lg  pt-4 font-semibold">User status</h1>
      <PieChart width={400} height={235}>
        <Pie
        label={false}
          data={datas}
          cx={200}
          cy={100}
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {datas.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <div className="flex justify-center items-center gap-5">
        <h1 className="flex items-center gap-2 flex-col"><div className="w-[15px] h-[15px] bg-[#ff8042] rounded-full"></div><span className="font-medium text-[#ff8042]">Verified</span></h1>
        <h1 className="flex items-center gap-2 flex-col"><div className="w-[15px] h-[15px] bg-[#ffbb28] rounded-full"></div><span className="font-medium text-[#ffbb28]">Unverified </span></h1>
        
      </div>
    </div>
  );
};

export default Pycomponent;
