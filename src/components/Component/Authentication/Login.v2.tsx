import Image from 'next/image';
import React from 'react';
import palestineSvg from "@/assets/Login/palestine_dark.svg"

const LoginV2 = () => {
    return (
        <div className="min-h-screen flex bg-gradient-to-r from-teal-50 to-gray-100">

            {/* Right Side - Sign In */}
            <div className="hidden md:flex flex-col justify-center items-center w-1/3 bg-[#0f172a] text-white p-8">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold">Hikmah</h1>
                    <p className="text-gray-400 text-sm">Freedom with values</p>
                </div>

                <h2 className="text-xl font-semibold mb-2">Sign In</h2>
                <p className="text-gray-400 mb-6 text-sm">Welcome to Hikmah</p>

                <button className="bg-emerald-500 hover:bg-emerald-600 px-6 py-2 rounded-full shadow-md transition">
                    Sign in
                </button>

                {/* Footer */}
                <div className="mt-12 text-center text-xs text-gray-400 space-y-2">
                    <div className="flex items-center justify-center gap-2">
                        <Image src={palestineSvg} className='lg:max-w-[200px] border border-gray-500 p-2 rounded-md' alt="Palestine Flag" width={500} height={100} />
                    </div>
                    <p>Copyright 2025 by Hikmah — A Kahf Software Initiative</p>
                    <div className="flex justify-center gap-4 underline">
                        <a href="#">Support</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms & Conditions</a>
                    </div>
                </div>
            </div>

            {/* Left Side - Feed */}
            <div className="w-full md:w-2/3 p-4 overflow-y-auto">

            </div>


        </div>
    );
};

export default LoginV2; 