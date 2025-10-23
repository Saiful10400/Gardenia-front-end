"use client";

import React from "react";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BarChart = ({
  data,
}: {
  data: {
    deletedPost: number;
    paidPost: number;
    freePost: number;
    blockPost: number;
  };
}) => {
  const chartData = [
    {
      Deleted: data?.deletedPost,
      Paid: data?.paidPost,
      Free: data?.freePost,
      Block: data?.blockPost,
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mt-5 overflow-auto">
      <h2 className="text-center text-lg font-bold text-[#147d3b] mb-4">
        Post Status
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <ReBarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" />
          <XAxis
            dataKey="name"
            tick={{ fill: "#555", fontSize: 13, fontWeight: 500 }}
          />
          <YAxis tick={{ fill: "#555", fontSize: 13, fontWeight: 500 }} />
          <Tooltip
            contentStyle={{
              borderRadius: "10px",
              backgroundColor: "#f9f9f9",
              border: "1px solid #ddd",
            }}
            itemStyle={{ fontWeight: "bold", color: "#147d3b" }}
          />
          <Legend
            verticalAlign="top"
            height={36}
            wrapperStyle={{ fontSize: 13, fontWeight: 600 }}
          />
          <Bar dataKey="Deleted" fill="#ffea00" background={{ fill: "#f0f0f0" }} />
          <Bar dataKey="Paid" fill="#147d3b" />
          <Bar dataKey="Free" fill="#00c853" />
          <Bar dataKey="Block" fill="#ff1744" />
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
