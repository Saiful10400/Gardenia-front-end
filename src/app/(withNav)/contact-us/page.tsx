"use client";

import Tocenter from "@/components/Helper/Tocenter";
import Button from "@/components/Shared/Button/Button";
import InputField from "@/components/Shared/InputField/InputField";
import React, { FormEvent } from "react";
import swal from "sweetalert";
import { IoLogoWechat } from "react-icons/io5";
import { BsTwitterX } from "react-icons/bs";
import { IoIosSend } from "react-icons/io";
import { FaPhoneVolume } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import AOS from "aos";

const ContactUs = () => {
  AOS.init();

  const messageSendHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    swal(
      "Thank you for reaching out!",
      "We’ve received your message and will get back to you shortly.",
      "success"
    );
    e.currentTarget.reset()
  };

  return (
    <div className="min-h-[70vh]">
      <Tocenter>
        <div>
          <div data-aos="fade-up" className="py-14 px-4 lg:px-0">
            <h1 className="text-center text-4xl lg:text-5xl">
              Contact our team
            </h1>
            <p className="lg:w-[70%] text-center mx-auto mt-5 font-normal ">
              Got any questions about our keyboards or customizing your setup?
              We're here to help! Chat with our friendly team 24/7, and we'll
              assist you in finding the perfect keyboard or accessory, all in
              under 5 minutes.
            </p>
          </div>
          <div className="flex items-start gap-12 justify-center mt-7 px-4 lg:px-0 flex-col-reverse lg:flex-row">
            <form
              data-aos="fade-right"
              onSubmit={messageSendHandle}
              className="lg:w-[40%]"
            >
              <div className="grid grid-cols-2 gap-7">
                <InputField type="text" placeholder="First Name" />
                <InputField type="text" placeholder="Last Name" />
              </div>
              <InputField type="email" placeholder="Email" />
              <InputField type="text" placeholder="Subject" />
              <InputField type="textarea" placeholder="Your Message" />
              <Button text="Send Message" className="w-full text-lg" />
            </form>
            <div data-aos="fade-left" className="lg:w-[30%]">
              <h1 className="text-3xl">Chat with us</h1>
              <h1 className="text-base mt-2">
                Speak to our friendly team via live chat.
              </h1>

              <ul className="flex flex-col justify-start items-start gap-2 mt-4">
                <li>
                  <a
                    className="flex items-center gap-2"
                    target="_blank"
                    href="https://www.wechat.com"
                  >
                    <IoLogoWechat className="text-xl" />{" "}
                    <span className="underline font-bold text-base">
                      Start a live chat
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center gap-2"
                    target="_blank"
                    href="https://mail.google.com/"
                  >
                    <IoIosSend className="text-xl" />{" "}
                    <span className="underline font-bold text-base">
                      Send us and email
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center gap-2"
                    target="_blank"
                    href="https://x.com/home"
                  >
                    <BsTwitterX className="text-xl" />{" "}
                    <span className="underline font-bold text-base">
                      Message us on x
                    </span>
                  </a>
                </li>
              </ul>

              <div className="mt-10">
                <h1 className="text-3xl">Call us</h1>
                <h1 className="text-base mt-2">
                  Call our team Mon-Fri from 8am to 5pm
                </h1>
                <div>
                  <a className="flex items-center gap-2 mt-4">
                    <FaPhoneVolume className="text-lg" />{" "}
                    <span className="underline font-bold text-base">
                      +1 01425-258
                    </span>
                  </a>
                </div>
              </div>

              <div className="mt-10">
                <h1 className="text-3xl">Visit us</h1>
                <h1 className="text-base mt-2">
                  Chat to us in person at our Washington HQ.
                </h1>
                <div>
                  <a className="flex items-center gap-2 mt-4">
                    <FaMapMarkerAlt className="text-lg" />{" "}
                    <span className="underline font-bold text-base">
                      100 Smith Street, Collingwood VIC 3066
                    </span>
                  </a>
                </div>
              </div>

              <div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </Tocenter>
    </div>
  );
};

export default ContactUs;
