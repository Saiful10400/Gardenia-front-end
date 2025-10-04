"use client";
import React, { useEffect, useState } from "react";
import "./css/createStory.css";
import { useCreateStoryMutation, useGetAllMusicQuery } from "@/Redux/api/api";
import Image from "next/image";
import audioWave from "../../../assets/home/icon/audio-wave.gif";
import { MdPhoto, MdSpeaker } from "react-icons/md";
import { Music2Icon, Text, Type, Volume, Volume1 } from "lucide-react";
import { imageUploadToDb } from "@/utils/imageUpload";
import Button from "@/components/Component/Button/Button";
import { useAppSelector } from "@/Redux/hoocks/Convaying";
import { toast } from "react-toastify";

const CreateStory = ({
  visibilityStatus,
  parentVisibilitySetter,
}: {
  visibilityStatus: boolean;
  parentVisibilitySetter: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // api fetched data.
  const { loggedInUser } = useAppSelector((e) => e.authStore);
  const { data } = useGetAllMusicQuery(null);

  // story show and hide.
  const [showStoryDiv, setShowStoryDiv] = useState<boolean>(visibilityStatus);
  useEffect(() => {
    setShowStoryDiv(visibilityStatus);
  }, [visibilityStatus]);

  // single music.
  const [music, setMusic] = useState({});
  const musicInstance = new Audio(music?.url);
  musicInstance.loop = true;
  const playMusic = () => {
    musicInstance.play();
  };
  const stopMusic = () => {
    musicInstance.pause();
  };

  useEffect(() => {
    if (music.url) {
      playMusic();
    }
  }, [music]);

  // preview window.
  const [storyType, setStoryType] = useState<string | null>(null);

  // story preview on the preview window.
  const [storyImageBase64, setStoryImageBase64] = useState<string | null>(null);
  const previewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const imageFile = e.target.files[0];

    // initiate reader.
    const reader = new FileReader();
    reader.onload = () => {
      const base64code = reader?.result;
      setStoryImageBase64(base64code as string);
    };
    setStoryType("media")
    reader.readAsDataURL(imageFile);
  };

  // story create handle.
  const [createStory] = useCreateStoryMutation();
  const createStoryHandle = () => {
    if (music?._id) {
      createStory({
        user: loggedInUser?._id,
        musicId: music._id,
        mediaType: "photo",
      }).then((res) => {
        if (res?.data?.statusCode === 200) {
          toast.success("Story created.");
        }
      });
    } else {
      createStory({ user: loggedInUser?._id, mediaType: "photo" }).then(
        (res) => {
          if (res?.data?.statusCode === 200) {
            toast.success("Story created.");
          }
        }
      );
    }
  };

  return (
    <div
      className="w-full h-screen absolute top-0 left-0 z-50  "
      style={{ display: showStoryDiv ? "flex" : "none" }}
    >
      <aside className="w-[22%] h-full bg-white pt-6 pl-6">
        <h1 className="text-xl font-bold">Stories</h1>

        <section className=" bg-white mt-6">
          <h1 className="text-base font-semibold">Find music</h1>
          <form className="mt-3 flex gap-4">
            <input
              className="focus:outline-none border border-gray-400 p-1 py-[6px] rounded-md text-sm"
              type="text"
              placeholder="Music tittle"
            ></input>
            <button className="bg-[#25a82b] text-white rounded-md p-1 px-2">
              Search
            </button>
          </form>

          <div className="mt-5">
            <h1>All music ({data?.data.length})</h1>

            <div className="flex flex-col items-start gap-3 mt-3 h-[70vh] overflow-auto">
              {data?.data?.map((item) => (
                <button
                  onClick={() => {
                    stopMusic();
                    setMusic(item);
                  }}
                  className="w-full flex items-center gap-2"
                  key={item._id}
                >
                  <div className="w-[55px] h-[50px] border-green-400 border p-1 relative overflow-hidden rounded-md">
                    {item?._id === music?._id && (
                      <Image
                        alt="music cover art"
                        height={70}
                        width={70}
                        className=" w-full absolute top-0 left-0 wev-blur-bg p-1 scale-150 h-full object-cover"
                        src={audioWave}
                      ></Image>
                    )}

                    <Image
                      alt="music cover art"
                      height={70}
                      width={70}
                      className=" w-full h-full rounded-sm  object-cover "
                      src={item.musicArt}
                    ></Image>
                  </div>

                  <h1 className=" w-[70%] text-start">
                    {item.name.length <= 26
                      ? item.name
                      : item.name.slice(0, 27) + " " + "..."}
                  </h1>
                </button>
              ))}
            </div>
          </div>
          <section className="flex justify-start gap-4">
            <button
              onClick={() => {
                setShowStoryDiv(false);
                // update parent visibility status.
                parentVisibilitySetter(false);
                document.body.style.overflow = "scroll";
              }}
              className="bg-gray-300 text-black font-semibold py-2 px-4 rounded-md"
            >
              Discard
            </button>
            <button
              onClick={createStoryHandle}
              disabled={storyType ? false : true}
              className="bg-[#25a82b] text-white font-semibold py-2 px-4 rounded-md"
            >
              Share to story
            </button>
          </section>
        </section>
      </aside>

      {/* story showcaseing container. */}

      <aside className="w-[78%] h-full blur-bg">
        {!storyType ? (
          <section className="flex gap-14 justify-center items-center w-full h-[90vh]">
            <label
              htmlFor="storyImg"
              className="w-[250px] h-[350px]  cursor-pointer flex justify-center items-center flex-col gap-3 rounded-md  bg-gradient-to-t  from-white via-gray-50 to-gray-100"
            >
              <input onInput={previewImage} id="storyImg" hidden type="file" />
              <span className="p-3 rounded-full bg-gray-200 inline-block">
                <MdPhoto className="text-2xl" />
              </span>
              <h1 className="font-semibold">Create Photo story</h1>
            </label>
            <button className="w-[250px] h-[350px] flex justify-center items-center flex-col gap-3 rounded-md  bg-gradient-to-t  from-white via-gray-50 to-gray-100">
              <span className="p-3 rounded-full bg-gray-200 inline-block">
                <Type className="text-2xl" />
              </span>
              <h1 className="font-semibold">Create text story</h1>
            </button>
          </section>
        ) : (
          <section className="w-full h-full flex justify-center items-center">
            <div className="w-[31%] relative rounded-md h-[68%] bg-white">
              {music?.name && (
                <span className="flex absolute top-2 left-4 wev-blur-bg rounded-md">
                  <Volume1 />{" "}
                  <h1 className="font-semibold text-sm">{music?.name}</h1>
                </span>
              )}
              {storyType === "media" ? (
                // <Image
                //   className="w-full h-full object-cover rounded-md"
                //   alt="media"
                //   height={600}
                //   width={300}
                //   src={ storyImageBase64 as string}
                // ></Image>
                <img className="w-full h-full object-cover rounded-md" src={ storyImageBase64 as string} alt="" />
              ) : (
                <input type="text"></input>
              )}
            </div>
          </section>
        )}
      </aside>
    </div>
  );
};

export default CreateStory;
