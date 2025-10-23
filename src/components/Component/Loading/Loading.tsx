"use client";

import React from "react";

const Loading = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50">
      
      {/* Bouncing dot */}
      {/* <div className="mb-6 flex space-x-3">
        <div className="w-5 h-5 bg-[#147d3b] rounded-full animate-bounce"></div>
        <div className="w-5 h-5 bg-[#147d3b] rounded-full animate-bounce delay-150"></div>
        <div className="w-5 h-5 bg-[#147d3b] rounded-full animate-bounce delay-300"></div>
      </div> */}

      {/* Loading text */}
      <h2 className="text-xl lg:text-2xl font-semibold text-[#147d3b] mb-4 animate-pulse">
        Loading, please wait...
      </h2>

      {/* Progress bar */}
      <div className="w-56 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full w-1/3 bg-[#147d3b] rounded-full animate-[loadingBar_1.5s_linear_infinite]"></div>
      </div>

      {/* Custom keyframe animation for progress bar */}
      <style jsx>{`
        @keyframes loadingBar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(50%); }
          100% { transform: translateX(100%); }
        }

        .delay-150 {
          animation-delay: 0.15s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  );
};

export default Loading;
