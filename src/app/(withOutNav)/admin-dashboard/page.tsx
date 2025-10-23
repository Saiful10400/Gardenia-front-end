"use client";

import React from "react";
import BarChart from "@/components/Component/Dashboard/Admin-dashboard/Asidenav/Graphs/Barchart/BarChart";
import LIneChart from "@/components/Component/Dashboard/Admin-dashboard/Asidenav/Graphs/lineChart/LIneChart";
import Piechart from "@/components/Component/Dashboard/Admin-dashboard/Asidenav/Graphs/Piechart/Piechart";
import { useDashboardCredentialsQuery } from "@/Redux/api/api";
import { TdashboardData } from "@/Types";
import { DollarSign, StickyNote, User } from "lucide-react";

const DashboardOverView = () => {
  const { data } = useDashboardCredentialsQuery(null);
  const dashboardCredentials: TdashboardData | undefined = data?.data;

  return (
    <div className="lg:px-14 px-4 mb-8">
      {/* Top Cards */}
      <section className="flex flex-col lg:flex-row justify-between items-center gap-6">
        {[
          {
            title: "Total Payment",
            value: dashboardCredentials?.cardData?.totalPayment || 0,
            icon: <DollarSign size={50} className="text-white" />,
            gradient: "from-[#147d3b] to-[#0f622d]",
            unit: "$",
          },
          {
            title: "Total Post",
            value: dashboardCredentials?.cardData?.totalPost || 0,
            icon: <StickyNote size={50} className="text-white" />,
            gradient: "from-[#f4cb0d] to-[#caa900]",
          },
          {
            title: "Total Users",
            value: dashboardCredentials?.cardData?.totalUser || 0,
            icon: <User size={50} className="text-white" />,
            gradient: "from-[#00c853] to-[#009624]",
          },
        ].map((card, index) => (
          <div
            key={index}
            className={`lg:w-[400px] w-full rounded-3xl h-[200px] bg-gradient-to-tr ${card.gradient} shadow-2xl flex items-center justify-center gap-5 p-6 transform transition-transform duration-300 hover:scale-105`}
          >
            {card.icon}
            <div className="text-white">
              <h1 className="text-3xl lg:text-4xl font-bold">{card.title}</h1>
              <h2 className="text-2xl lg:text-3xl font-semibold mt-2">
                {card.value}
                {card.unit || ""}
              </h2>
            </div>
          </div>
        ))}
      </section>

      {/* Graph Section */}
      <section className="flex flex-col lg:flex-row mt-8 gap-6">
        {/* Left Charts */}
        <div className="lg:w-[70%] w-full flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow-md p-5">
            <LIneChart />
          </div>
          <div className="bg-white rounded-2xl shadow-md p-5">
            <BarChart
              data={
                dashboardCredentials?.barChartData as {
                  deletedPost: number;
                  paidPost: number;
                  freePost: number;
                  blockPost: number;
                }
              }
            />
          </div>
        </div>

        {/* Right PieChart */}
        <div className="lg:w-[30%] w-full">
          <div className="bg-white rounded-2xl shadow-md p-5">
            <Piechart
              data={
                dashboardCredentials?.pieChartData as {
                  verifyedUser: number;
                  unVerifyedUser: number;
                }
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardOverView;
