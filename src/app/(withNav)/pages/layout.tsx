"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import PageAside from "@/components/Page/userPage/PageAside";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import InputField from "@/components/Shared/InputField/InputField";
import { imageUploadToDb } from "@/utils/imageUpload";
import { useCreateApageMutation } from "@/Redux/api/api";
import { toast } from "react-toastify";
import { useAppSelector } from "@/Redux/hoocks/Convaying";

const Layout = ({ children }: { children: React.ReactChild }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const { loggedInUser } = useAppSelector((e) => e.authStore);
  const [createPage] = useCreateApageMutation();
  const formSubmitHandle = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    const logo = await imageUploadToDb(form.logo.files[0]);
    const coverImg = await imageUploadToDb(form.coverImg.files[0]);
    const admin = loggedInUser?._id;
    createPage({ name, logo, coverImg, admin }).then((res) => {
      if (res?.data?.statusCode === 200) {
        setLoading(false);
        toast.success("Page Created");
      }
    });
  };

  return (
    <div className="flex flex-col lg:flex-row items-start gap-3 bg-[#f2f4f7]">
      <aside className="lg:w-[15%] lg:min-h-[calc(100vh-72px)] lg:px-2 mt-4  bg-white">
        {/* <button  className="flex rounded-md py-2 justify-center  items-center gap-2 font-semibold w-full bg-[#bbdbc7]"><Plus/> Create new page</button> */}
        <Button
          className="flex rounded-md py-2 justify-center  items-center gap-2 font-semibold w-full bg-[#bbdbc7]"
          onPress={onOpen}
        >
          <Plus /> Create new page
        </Button>

        <Modal
          isOpen={isOpen}
          placement="top-center"
          onOpenChange={onOpenChange}
          className="pb-2 px-3"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex items-center justify-center p-0 pt-2 pb-4 text-xl text-center gap-1">
                  Create page
                </ModalHeader>

                <form
                  onSubmit={formSubmitHandle}
                  className="flex flex-col gap-3"
                >
                  <InputField
                    name="name"
                    className="border-1 !text-md !font-medium !py-1"
                    placeholder="Group name"
                    type="text"
                  />
                  <InputField
                    name="logo"
                    className="border-1 !text-md !font-medium !py-1"
                    placeholder="Logo"
                    type="file"
                  />
                  <InputField
                    name="coverImg"
                    className="border-1 !text-md !font-medium !py-1"
                    placeholder="Cover image"
                    type="file"
                  />

                  <div className="flex items-center justify-end gap-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="text-white bg-[#f1192ba1] font-semibold px-4 py-1 rounded-md"
                    >
                      Close
                    </button>
                    <button
                      disabled={loading}
                      className="text-white bg-[#19f124c0] font-semibold px-4 py-1 rounded-md"
                    >
                      {loading ? (
                        <span className="loading loading-dots loading-md"></span>
                      ) : (
                        "Create"
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </ModalContent>
        </Modal>

        <PageAside />
      </aside>
      <div className="lg:w-[85%] lg:min-h-[calc(100vh-72px)] mt-5">
        {" "}
        {children}
      </div>
    </div>
  );
};

export default Layout;
