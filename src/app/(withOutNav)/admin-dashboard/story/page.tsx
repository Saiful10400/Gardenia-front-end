"use client";
import Button from "@/components/Component/Button/Button";
import InputField from "@/components/Component/InputField/InputField";
import DashboardTable from "@/components/ui/DashboardTable";
import { useAddMusicMutation, useGetAllMusicQuery } from "@/Redux/api/api";
import { TtableData } from "@/Types";
import { imageUploadToDb } from "@/utils/imageUpload";
import Image from "next/image";
import React from "react";
import { toast } from "react-toastify";

const Story = () => {
  const [addMusic] = useAddMusicMutation();
  const formSubmitHandle = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("file", e.target?.audio?.files[0]);
    formdata.append("upload_preset", "story_audio");

    const url = "https://api.cloudinary.com/v1_1/dfrlt0zfn/auto/upload";
    fetch(url, {
      method: "POST",
      body: formdata,
    })
      .then((res) => res.json())
      .then(async (data) => {
        const coverPhotoUrl = await imageUploadToDb(
          e.target?.coverArt?.files[0]
        );

        addMusic({
          name: e.target.name.value,
          musicArt: coverPhotoUrl,
          url: data?.url,
        }).then((res) => {
          if (res?.data?.statusCode === 200) {
            toast.success("New music added.");
          }
        });
      });
  };

  const { data } = useGetAllMusicQuery(null);

  const tableData: TtableData = {
    name: "story",
    tittle: "All Story Music",
    createRoute: " ",
    keyValue: {
      "Music Art": "musicArt",
      "Track Name": "name",
      "Date": "createdAt"

    },
  };


  return (
    <>
      {/* Upload Form Card */}
      <form
        onSubmit={formSubmitHandle}
        className="w-full bg-white rounded-2xl shadow-md p-6 mb-6 flex flex-col gap-5"
      >
        {/* Form Title */}
        <h2 className="text-2xl font-bold text-[#147d3b] mb-4">
          Upload New Music
        </h2>

        {/* Input Fields */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Music Name */}
          <InputField
            name="name"
            className="flex-1 border-2 border-gray-300 rounded-md p-2 focus:border-[#147d3b] focus:outline-none"
            placeholder="Music name"
            type="text"
          />

          {/* Cover Art */}
          <InputField
            name="coverArt"
            className="flex-1 border-2 border-gray-300 rounded-md   cursor-pointer file:border-none file:bg-[#147d3b] file:text-white file:px-3 file:py-1 file:rounded-md file:font-semibold focus:outline-none"
            placeholder="Music cover art"
            type="file"
          />

          {/* Audio File */}
          <InputField
            name="audio"
            className="flex-1 border-2 border-gray-300 rounded-md   cursor-pointer file:border-none file:bg-[#147d3b] file:text-white file:px-3 file:py-1 file:rounded-md file:font-semibold focus:outline-none"
            placeholder="Music file"
            type="file"
          />
        </div>

        {/* Upload Button */}
        <Button
          className="mt-4 w-max px-6 py-2 bg-[#147d3b] text-white font-semibold rounded-md hover:bg-[#0f622d] transition-all duration-200"
          text="Upload"
        />
      </form>

      {/* Dashboard Table */}
      <div className="w-full">
        <DashboardTable data={tableData} />
      </div>
    </>


  );
};

export default Story;
