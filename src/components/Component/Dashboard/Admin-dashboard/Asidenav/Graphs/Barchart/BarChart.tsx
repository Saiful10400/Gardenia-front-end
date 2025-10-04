"use client";

import React from "react";
import {
  BarChart as BarLIne,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const BarChart = ({data}:{data:{
  deletedPost: number;
  paidPost: number;
  freePost: number;
  blockPost: number;
}}) => {
  const datas = [
    {
      Deleted: data?.deletedPost,
      Paid: data?.paidPost,
      Free: data?.freePost,
      Block: data?.blockPost,
    },
  ];
  return (
    <div className="bg-white mt-5 pt-5 px-5 rounded-xl border lg:overflow-hidden overflow-auto">
      <h1 className="text-center text-lg font-semibold">Post status</h1>
      <BarLIne width={1000} height={350} data={datas}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Deleted" fill="#ffea00" background={{ fill: "#eee" }} />
        <Bar dataKey="Paid" fill="#e91e63" />
        <Bar dataKey="Free" fill="#00c853" />
        <Bar dataKey="Block" fill="#ff1744" />
      </BarLIne>
    </div>
  );
};

export default BarChart;
