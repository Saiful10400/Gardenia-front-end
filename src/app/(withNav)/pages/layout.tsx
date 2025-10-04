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
import InputField from "@/components/Component/InputField/InputField";
import { imageUploadToDb } from "@/utils/imageUpload";
import { useCreateApageMutation } from "@/Redux/api/api";
import { toast } from "react-toastify";
import { useAppSelector } from "@/Redux/hoocks/Convaying";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const { loggedInUser } = useAppSelector((e) => e.authStore);
  const [createPage] = useCreateApageMutation();

  const formSubmitHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget as HTMLFormElement & {
      name: { value: string };
      logo: { files: FileList };
      coverImg: { files: FileList };
    };

    const name = form.name.value;
    const logo = await imageUploadToDb(form.logo.files[0]);
    const coverImg = await imageUploadToDb(form.coverImg.files[0]);
    const admin = loggedInUser?._id;

    createPage({ name, logo, coverImg, admin }).then((res) => {
      setLoading(false);
      if (res?.data?.statusCode === 200) {
        toast.success("✅ Page Created Successfully");
      }
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 bg-[#f2f4f7]">
      {/* Sidebar */}
      <aside className="lg:w-[18%] lg:min-h-[calc(100vh-72px)] lg:sticky top-[72px] p-3 bg-white rounded-xl shadow-sm flex flex-col gap-4 mt-4">
        <Button
          className="flex items-center justify-center gap-2 font-semibold w-full rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md hover:from-green-600 hover:to-green-700 transition-all"
          onPress={onOpen}
        >
          <Plus /> Create New Page
        </Button>

        <PageAside />
      </aside>

      {/* Main Content */}
      <main className="lg:w-[82%] lg:min-h-[calc(100vh-72px)] mt-4 bg-white rounded-xl shadow-sm p-5">
        {children}
      </main>

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={onOpenChange}
        className="pb-2 px-3"
      >
        <ModalContent>
          {(onClose) => (
            <>
              {/* Header */}
              <ModalHeader className="flex items-center justify-center relative p-0">
                <div className="w-full text-center py-3 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Create a New Page
                  </h2>
                </div>
              </ModalHeader>

              {/* Form */}
              <form
                onSubmit={formSubmitHandle}
                className="flex flex-col gap-4 py-4 px-2"
              >
                <InputField
                  name="name"
                  className="border rounded-md px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-green-400"
                  placeholder="Page name"
                  type="text"
                />
                <InputField
                  name="logo"
                  className="border rounded-md px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-green-400"
                  placeholder="Upload logo"
                  type="file"
                />
                <InputField
                  name="coverImg"
                  className="border rounded-md px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-green-400"
                  placeholder="Upload cover image"
                  type="file"
                />

                {/* Buttons */}
                <div className="flex items-center justify-end gap-3 mt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-semibold rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={loading}
                    className="px-4 py-2 text-sm font-semibold rounded-md bg-green-500 text-white hover:bg-green-600 transition-all"
                  >
                    {loading ? (
                      <span className="loading loading-dots loading-md"></span>
                    ) : (
                      "Create Page"
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Layout;
