"use client";
import Button from "@/components/Shared/Button/Button";
import InputField from "@/components/Shared/InputField/InputField";
import { useAddMusicMutation, useGetAllMusicQuery } from "@/Redux/api/api";
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

  return (
    <>
      <form
        onSubmit={formSubmitHandle}
        className="lg:w-[30%] flex flex-col gap-3 bg-white rounded-md p-2"
      >
        <InputField
          name="name"
          className="border-2"
          placeholder="Music name"
          type="text"
        />
        <InputField
          name="coverArt"
          className="border-2"
          placeholder="Music cover art"
          type="file"
        />
        <InputField
          name="audio"
          className="border-2"
          placeholder="Music file"
          type="file"
        />
        <Button className="w-full mt-5 text-lg" text="Upload" />
      </form>

      <div className="grid lg:grid-cols-7 gap-2 mt-4">
        {data?.data.map((item) => (
          <div key={item._id} className="p-1 bg-white rounded-md text-center">
            {item.name}
            <Image className="w-full h-[200px] object-cover" alt="music cover art" src={item.musicArt || "https://picsum.photos/seed/picsum/400/500"} width={400} height={500}/>
            <audio controls className="w-full">
              <source src={item.url} type="audio/mp3" />
            </audio>
          </div>
        ))}
      </div>
    </>
  );
};

export default Story;
