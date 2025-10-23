"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LineChartDashboard = () => {
  const demo = [
    { name: "Jan", Bkash: 4000, MasterCard: 2400 },
    { name: "Feb", Bkash: 3000, MasterCard: 1398 },
    { name: "Mar", Bkash: 2000, MasterCard: 9800 },
    { name: "Apr", Bkash: 2780, MasterCard: 3908 },
    { name: "May", Bkash: 1890, MasterCard: 4800 },
    { name: "Jun", Bkash: 2390, MasterCard: 3800 },
    { name: "Jul", Bkash: 3490, MasterCard: 4300 },
    { name: "Aug", Bkash: 3200, MasterCard: 4500 },
    { name: "Sep", Bkash: 2100, MasterCard: 5000 },
    { name: "Oct", Bkash: 2700, MasterCard: 5200 },
    { name: "Nov", Bkash: 2300, MasterCard: 4100 },
    { name: "Dec", Bkash: 3000, MasterCard: 4700 },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 w-full overflow-auto">
      <h2 className="text-lg font-bold text-[#147d3b] text-center mb-4">
        Payment Status
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={demo} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" />
          <XAxis dataKey="name" tick={{ fill: "#555", fontSize: 13 }} />
          <YAxis tick={{ fill: "#555", fontSize: 13 }} />
          <Tooltip
            contentStyle={{ borderRadius: "10px", backgroundColor: "#f9f9f9", border: "1px solid #ddd" }}
            itemStyle={{ color: "#147d3b", fontWeight: "bold" }}
          />
          <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: 13 }} />
          <Line
            type="monotone"
            dataKey="Bkash"
            stroke="#147d3b"
            strokeWidth={3}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="MasterCard"
            stroke="#f4cb0d"
            strokeWidth={3}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartDashboard;
