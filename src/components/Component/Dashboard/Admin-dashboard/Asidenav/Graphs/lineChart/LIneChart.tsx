"use client";

import React from "react";
import "./style.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useAllPaymentHistoryQuery } from "@/Redux/api/api";

const LIneChart = () => {
  const { data } = useAllPaymentHistoryQuery(null);

  const payments = data?.data;
 

  const demo = [
    {
      name: "January",
      Bkash: 4000,
      MasterCard: 2400,
    },
    {
      name: "February",
      Bkash: 3000,
      MasterCard: 1398,
    },
    {
      name: "March",
      Bkash: 2000,
      MasterCard: 9800,
    },
    {
      name: "April",
      Bkash: 2780,
      MasterCard: 3908,
    },
    {
      name: "May",
      Bkash: 1890,
      MasterCard: 4800,
    },
    {
      name: "June",
      Bkash: 2390,
      MasterCard: 3800,
    },
    {
      name: "July",
      Bkash: 3490,
      MasterCard: 4300,
    },
    {
      name: "August",
      Bkash: 3200,
      MasterCard: 4500,
    },
    {
      name: "September",
      Bkash: 2100,
      MasterCard: 5000,
    },
    {
      name: "October",
      Bkash: 2700,
      MasterCard: 5200,
    },
    {
      name: "November",
      Bkash: 2300,
      MasterCard: 4100,
    },
    {
      name: "December",
      Bkash: 3000,
      MasterCard: 4700,
    }
  ];

  return (
    <div className="bg-white pt-5 px-5 rounded-xl border w-full lg:overflow-hidden overflow-auto">
      <h1 className="text-center text-lg font-semibold">Payment status</h1>
      <LineChart width={1000} height={300} data={demo}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Bkash"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="MasterCard" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

export default LIneChart;
