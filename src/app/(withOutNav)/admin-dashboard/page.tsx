"use client";

import BarChart from "@/components/WithoutNav/Admin-dashboard/Asidenav/Graphs/Barchart/BarChart";
import LIneChart from "@/components/WithoutNav/Admin-dashboard/Asidenav/Graphs/lineChart/LIneChart";
import Piechart from "@/components/WithoutNav/Admin-dashboard/Asidenav/Graphs/Piechart/Piechart";
import { DollarSign, StickyNote, User } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className="lg:px-14 mb-8">
      {/* top cards. */}

      <section className="flex justify-between lg:flex-row flex-col items-center gap-10">
        <div className="lg:w-[400px] w-full rounded-3xl h-[200px] bg-gradient-to-tr flex items-center justify-center gap-3 from-gray-300 to-[#bdbdbd] shadow-2xl">
          <DollarSign size={50} />

          <div>
            <h1 className="text-4xl ">Total Pyment</h1>
            <h1 className="text-3xl mt-3 font-semibold">{860}$</h1>
          </div>
        </div>

        <div className="lg:w-[400px] w-full rounded-3xl h-[200px] bg-gradient-to-tr flex items-center justify-center gap-3 from-gray-300 to-[#bdbdbd] shadow-2xl">
          <StickyNote size={50} />

          <div>
            <h1 className="text-4xl ">Total Post</h1>
            <h1 className="text-3xl mt-3 font-semibold">{50}</h1>
          </div>
        </div>

        <div className="lg:w-[400px] w-full rounded-3xl h-[200px] bg-gradient-to-tr flex items-center justify-center gap-3 from-gray-300 to-[#bdbdbd] shadow-2xl">
          <User size={50} />

          <div>
            <h1 className="text-4xl ">Total user</h1>
            <h1 className="text-3xl mt-3 font-semibold">{24}</h1>
          </div>
        </div>
      </section>

      {/* graph section. */}

      <section className=" flex mt-5 flex-col gap-3 lg:flex-row items-start lg:mt-11 min-h-40">
        {/* linechart seciton. */}

        <div className="lg:w-[70%] w-full">
          <LIneChart />
          <BarChart />
        </div>

        {/* piechart secion */}

        <div className="lg:w-[30%] w-full">
          <Piechart />
        </div>
      </section>
    </div>
  );
};

export default page;
