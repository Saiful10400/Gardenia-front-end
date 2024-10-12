"use client";

import React from "react";
import tree from "../../../assets/home/cover.png";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";

const Banner = () => {
// typewrite array.
const gardeningQuotes = [
    "To plant a garden is to believe in tomorrow.",
    "Gardens are a form of autobiography.",
    "A garden is a friend you can visit anytime.",
    "The love of gardening is a seed that once sown never dies.",
    "Nature does not hurry, yet everything is accomplished.",
    "In every gardener, there is a child who believes in The Seed Fairy.",
    "Gardening adds years to your life and life to your years.",
    "Flowers are the music of the ground, from earth's lips spoken without sound.",
    "Gardening is the purest of human pleasures.",
    "The earth laughs in flowers."
  ];
  






  return (
    <div className="flex items-center">
      <div className="lg:w-[50%] pt-12">
        

        <h1 className="text-6xl font-bold">Grow Life, Inspire Beauty!</h1>
        <h1 className="text-3xl mt-6 font-normal">
          <Typewriter
            words={gardeningQuotes}
            loop={5}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h1>
      </div>

      <div className="lg:w-[50%]">
        <Image
          height={600}
          className="w-full object-contain h-[500px]"
          width={600}
          alt="coverImage"
          src={tree}
        />
      </div>
    </div>
  );
};

export default Banner;
