import React from "react";
import "./style.css";
import { PieChart, Pie, Cell } from "recharts";
const Pycomponent = () => {
  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="bg-white pb-6 px-5  rounded-xl w-full lg:overflow-hidden overflow-auto">
      <h1 className="text-center text-lg  font-semibold">User Type status</h1>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default Pycomponent;
