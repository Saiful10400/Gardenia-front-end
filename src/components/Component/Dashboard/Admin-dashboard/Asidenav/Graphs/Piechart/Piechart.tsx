"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const PieComponent = ({
  data,
}: {
  data: { verifyedUser: number; unVerifyedUser: number };
}) => {
  const chartData = [
    { name: "Unverified", value: data?.unVerifyedUser || 0 },
    { name: "Verified", value: data?.verifyedUser || 0 },
  ];

  const COLORS = ["#ffbb28", "#147d3b"]; // Verified = primary color

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 w-full overflow-auto">
      <h2 className="text-center text-lg font-bold text-[#147d3b] mb-4">
        User Status
      </h2>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            labelLine={false}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex justify-center items-center gap-6 mt-4">
        {chartData.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center gap-2 text-sm font-medium"
          >
            <div
              className={`w-4 h-4 rounded-full`}
              style={{ backgroundColor: COLORS[index] }}
            ></div>
            <span
              className="capitalize"
              style={{ color: COLORS[index] }}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieComponent;
