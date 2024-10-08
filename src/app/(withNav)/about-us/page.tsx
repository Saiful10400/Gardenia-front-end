import Tocenter from '@/components/Helper/Tocenter';
import { getAllTeamMember, getEvalution } from '@/StaticData/About-us';
import React from 'react';
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import Image from 'next/image';
import team from "../../../assets/pages/aboutUs/team.jpeg"
import "./style.css"
const page = () => {
    return (
        <div className="min-h-[70vh] lg:px-0 px-3">
      <Tocenter>
        <div>
          <div className=" min-h-[15vh] flex justify-center items-center">
            <h1 data-aos="zoom-in-down" className="text-3xl lg:text-5xl text-center font-normal">
              To get to know us,
              come and meet us!
            </h1>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-10 mt-24">
            <Image data-aos="fade-right" className="rounded-l-3xl" src={team} alt="team imge" />
            <div data-aos="fade-left">
              <h1 className="text-3xl lg:text-5xl mb-5">Our Mission</h1>
              <p className="text-lg font-medium">
                At <span className="font-bold">Acowork</span>, we are committed
                to creating an inspiring and flexible work environment where
                professionals, entrepreneurs, and creatives can thrive. Our
                mission is to foster collaboration, innovation, and community by
                providing top-notch facilities, dynamic workspaces, and seamless
                services that cater to the diverse needs of modern workers. We
                believe in empowering individuals and teams to unlock their full
                potential, whether they’re building a startup, growing a
                business, or pursuing personal projects. Together, we strive to
                create a supportive, inclusive, and vibrant ecosystem where
                ideas flourish, connections grow, and success is shared.
              </p>
            </div>
          </div>

          <div>
            <h1 className="text-3xl lg:text-5xl mt-28 mb-16 text-center">Meet the Team</h1>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
              {getAllTeamMember()?.map((item, idx) => {
                return (
                  <div data-aos="zoom-in"
                    key={idx}
                    className="relative bg-container overflow-hidden w-full h-[500px]"
                  >
                    <Image
                      className="w-full h-full object-cover"
                      src={item.image}
                      alt=""
                    />
                    <div className="absolute py-2 userTittle bottom-0 left-0 bg-gradient-to-r from-[#000000] to-[#00000075] w-full px-3">
                      <h1 className="text-xl font-normal text-white">
                        {item.name}
                      </h1>
                      <h1 className="text-xl font-normal text-white">
                        {item.title}
                      </h1>
                    </div>
                    <div className="hoverInContainer absolute flex justify-center items-center flex-col gap-5 px-5 text-center">
                      <p className="text-white font-semibold">{item.bio}</p>
                      <div className="flex justify-center items-center text-3xl gap-4 text-gray-300">
                        <a
                          target="_blank"
                          href={"mailto:" + item.contact.email}
                        >
                          <MdEmail />
                        </a>
                        <a target="_blank" href={item.contact.linkedin}>
                          <FaLinkedin />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div>
              <h1 className="text-3xl lg:text-5xl mt-28 mb-11 text-center">
                Our Story: Background and Evolution
              </h1>
              <p className="text-center font-normal text-lg">
                Our journey began with a simple idea: to create a space where
                innovation, collaboration, and productivity thrive. Over the
                years, we've evolved into a thriving co-working community that
                serves freelancers, startups, and established businesses alike.
              </p>
              <p className="font-normal text-lg">
                <span className="font-semibold text-2xl mt-6 block mb-3">Background:</span>
                Founded in 2018, we started as a small, local co-working space
                catering to a handful of creative professionals. The idea was to
                foster a community where people could come together, share
                ideas, and work in an environment designed to inspire
                creativity. As the demand for flexible workspaces grew, so did
                we.
              </p>
              <h1 className="text-2xl font-semibold mt-4">Evolution:</h1>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">


                <div data-aos="fade-up" className="shadow-lg text-center bg-gray-200 p-3 rounded-lg">
                  <h1 className="text-xl font-bold">
                    1<sup>st</sup> Year
                  </h1>
                  <p className="text-lg font-normal mt-4 px-3">{getEvalution().year1}</p>
                </div>
                
                <div data-aos="fade-up" className="shadow-lg text-center bg-gray-200 p-3 rounded-lg">
                  <h1 className="text-xl font-bold">
                    2<sup>nd</sup> Year
                  </h1>
                  <p className="text-lg font-normal mt-4 px-3">{getEvalution().year2}</p>
                </div>

                <div data-aos="fade-up" className="shadow-lg text-center bg-gray-200 p-3 rounded-lg">
                  <h1 className="text-xl font-bold">
                    3<sup>rd</sup> Year
                  </h1>
                  <p className="text-lg font-normal mt-4 px-3">{getEvalution().year3}</p>
                </div>



              </div>
            </div>
          </div>
        </div>
      </Tocenter>
    </div>
    );
};

export default page;