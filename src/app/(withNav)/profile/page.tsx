"use client";
import dynamic from "next/dynamic";

import Tocenter from "@/components/Helper/Tocenter";
import Loading from "@/components/Shared/Loading/Loading";
import swal from "sweetalert";
import {
  useCreateFollowingMutation,
  useGetAuserAllPostQuery,
  useGetAUserQuery,
  useGetFollowerAndFollowingQuery,
  useGetTotalVoteQuery,
  useUnfollowOneMutation,
  useUpdateAUserMutation,
} from "@/Redux/api/api";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import dummycover from "../../../assets/pages/profile/plainCover.jpeg";
import { FaCamera } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdModeEditOutline } from "react-icons/md";
import { IoHomeSharp } from "react-icons/io5";
import { PiStudentBold } from "react-icons/pi";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import imageUpload from "@/utils/imageUpload";
import { toast } from "react-toastify";
import InputField from "@/components/Shared/InputField/InputField";
import Button from "@/components/Shared/Button/Button";
import { useAppSelector } from "@/Redux/hoocks/Convaying";
import { FaCheck } from "react-icons/fa6";
import Link from "next/link";
import PostCreate from "@/components/Shared/PostCreate/PostCreate";
import PostCard from "@/components/Shared/PostCard/PostCard";
import NotAvailableContent from "@/components/Shared/NotAvailabeContent/NotAvailableContent";
import axios from "axios";
import blueTick from "../../../assets/profile/blueTick.png";
import FavouritePostCard from "@/components/Shared/FavouritePostcard/FavouritePostCard";

const ProfileComponent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data, isLoading } = useGetAUserQuery(id);

  const userData = data?.data;

  // checking is this me or not.

  const { loggedInUser, isLoading: currentLoading } = useAppSelector(
    (e) => e.authStore
  );

  const isYou = loggedInUser?._id === userData?._id;

  //

  // update handle.

  const [isCoverImgUploading, setIsCoverImageUploading] = useState(false);

  const [updateProfile] = useUpdateAUserMutation();
  // cover photo adding handle.
  const addCoverPhoto = (e) => {
    const files = e.target.files;
    setIsCoverImageUploading(true);
    imageUpload(files)
      .then((res) => {
        updateProfile({ id, coverImg: res[0] }).then((res) => {
          if (res?.data?.statusCode === 200) {
            setIsCoverImageUploading(false);
          }
        });
      })
      .catch(() => {
        toast.error("Unsupported Profile image file formate!", {
          position: "top-center",
        });
        setIsCoverImageUploading(false);
      });
  };

  //profile photo upload hanlde.
  const [isProfileImgUploading, setIsProfileImageUploading] = useState(false);
  const addProfilePhoto = (e) => {
    const files = e.target.files;
    setIsProfileImageUploading(true);
    imageUpload(files)
      .then((res) => {
        updateProfile({ id, img: res[0] }).then((res) => {
          if (res?.data?.statusCode === 200) {
            setIsProfileImageUploading(false);
          }
        });
      })
      .catch(() => {
        toast.error("Unsupported Profile image file formate!", {
          position: "top-center",
        });
        setIsProfileImageUploading(false);
      });
  };

  // bio update handle.

  const [updateBio, setUpdateBio] = useState(false);
  const [bioLoading, setBioLoading] = useState(false);

  const bioHandle = (e) => {
    e.preventDefault();
    const bio = e.target.bio.value;
    setBioLoading(true);
    updateProfile({ id, bio })
      .then((res) => {
        if (res?.data?.statusCode === 200) {
          setUpdateBio(false);
          setBioLoading(false);
        }
      })
      .catch((err) => {
        setBioLoading(false);
      });
  };

  // update details.
  const [detailsLoading, setDetailsLoading] = useState(false);
  const detailsHandle = (e) => {
    e.preventDefault();
    const form = e.target;
    setDetailsLoading(true);
    updateProfile({
      id,
      phone: form.phone.value,
      educationInstitute: form.education.value,
      address: form.address.value,
    })
      .then((res) => {
        if (res?.data?.statusCode === 200) {
          setDetailsLoading(false);
          document.getElementById("Update_modal")?.close();
          toast.success("Bio updated.", {
            position: "top-center",
          });
        }
      })
      .catch((err) => {
        setDetailsLoading(false);
      });
  };

  // all update handle end here.

  //retrieved follower data.

  const { data: followerData, isLoading: followerLoading } =
    useGetFollowerAndFollowingQuery(id);

  //retrieved follower data.

  const { data: totalVote, isLoading: voteLoading } = useGetTotalVoteQuery(id);

  const [isFollowIng, setIsFollowing] = useState(false);

  useEffect(() => {
    if (loggedInUser && followerData) {
      const data = followerData?.data?.followers?.find(
        (item) => item?.follower?._id === loggedInUser._id
      );
      if (data) {
        setIsFollowing(true);
      } else {
        setIsFollowing(false);
      }
    }
  }, [loggedInUser, followerData]);

  // following handle
  const [makeFollow] = useCreateFollowingMutation();
  const [makeUnfollow] = useUnfollowOneMutation(); // have to provide your id

  const followingHandle = () => {
    if (loggedInUser?._id === userData?._id) return;

    if (loggedInUser && userData) {
      if (!isFollowIng) {
        makeFollow({
          follower: loggedInUser?._id,
          following: userData?._id,
        }).then((res) => {
          console.log(res);
          F;
        });
      } else {
        makeUnfollow({
          follower: loggedInUser?._id,
          following: userData?._id,
        }).then((res) => {
          console.log(res);
        });
      }
    } else {
      toast.warning("Please Login first.!", {
        position: "top-center",
      });
    }
  };

  // get current user data from the db
  const { data: postData, isLoading: postLoading } =
    useGetAuserAllPostQuery(id);



  // inetiate payment
  const inetiatePayment = () => {
    if (loggedInUser) {
      axios
        .get(`${process.env.NEXT_PUBLIC_BACK_END_URL}/pay/${loggedInUser._id}`)
        .then((res) => {
          if (res.data?.data) {
            window.location.href = res.data.data;
          }
        });
    } else {
      toast.error("Please Login!", {
        position: "top-center",
      });
    }
  };

  // shwoing modal of payment.

  const tnxId = searchParams.get("tnxId");
  const paymentStatus = searchParams.get("paymentStatus");
  console.log({ paymentStatus });

  useEffect(() => {
    if (tnxId) {
      //check status and show modal.
      axios
        .get(`${process.env.NEXT_PUBLIC_BACK_END_URL}/payment-history/${tnxId}`)
        .then((res) => {
          if (res.data.data) {
            swal("Success", "Profile varified", "success");
          } else {
            swal("Failed", "Profile varificatin failed", "error");
          }
        });
    }
  }, [tnxId]);

  return isLoading ||
    postLoading ||
    voteLoading ||
    currentLoading ||
    followerLoading ? (
    <Loading />
  ) : !data ? (
    <NotAvailableContent />
  ) : (
    <Tocenter>
      <div className="bg-gray-100">
        {/* top cover photo and profile photo. */}

        <div className="relative h-[40vh]">
          <Image
            src={userData?.coverImg || dummycover}
            alt="coverPhoto"
            className="w-full object-cover rounded-lg h-full"
            height={300}
            width={1900}
          ></Image>

          {/* loader. */}
          {isCoverImgUploading && (
            <div className="w-full absolute top-0 left-0 h-full flex items-center justify-center">
              <span className="loading loading-dots loading-lg"></span>
            </div>
          )}

          {isYou && (
            <div className="absolute bottom-[20px] right-[10px]">
              <label
                htmlFor="coverUpdate"
                className="text-xl bg-gray-200 cursor-pointer  p-2 rounded-lg flex gap-3 items-center"
              >
                <FaCamera />
                <span className="text-base font-semibold">
                  {userData?.coverImg
                    ? "Update cover Photo"
                    : "Add cover Photo"}
                </span>
              </label>
              <input
                disabled={isCoverImgUploading}
                onInput={addCoverPhoto}
                id="coverUpdate"
                hidden
                type="file"
              />
            </div>
          )}
        </div>

        {/* profile section. */}

        <div className="flex flex-col lg:flex-row items-center lg:pb-0 pb-4 bg-white justify-between ">
          <div className="flex items-center justify-end gap-5 lg:gap-14">
            <div className="lg:w-[174px] w-[130px] bg-white p-2 relative lg:left-11 -top-[30px] rounded-full lg:h-[174px] h-[130px]">
              <Image
                src={data?.data?.img}
                alt="coverPhoto"
                className="w-full rounded-full object-cover h-full"
                height={170}
                width={170}
              ></Image>
              {/* loader. */}
              {isProfileImgUploading && (
                <div className="w-full absolute top-0 left-0 h-full flex items-center justify-center">
                  <span className="loading loading-dots text-gray-200 loading-lg"></span>
                </div>
              )}
              {isYou && (
                <div className="absolute bottom-[20px] right-[4px]">
                  <label
                    htmlFor="ImgUpdate"
                    className="text-2xl bg-gray-200 cursor-pointer  p-2 block rounded-full"
                  >
                    <FaCamera />
                  </label>
                  <input
                    disabled={isProfileImgUploading}
                    onInput={addProfilePhoto}
                    id="ImgUpdate"
                    hidden
                    type="file"
                  />
                </div>
              )}
            </div>
            <div className=" ">
              <h1 className="text-4xl font-bold flex gap-3 items-end">
                <span>{userData?.name}</span>
                {userData?.verifyed && (
                  <Image
                    className="w-[30px] h-[30px] box-content"
                    src={blueTick}
                    width={200}
                    height={200}
                    alt="blueTick"
                  />
                )}
              </h1>
              <h1 className="text-base flex items-center gap-4 text-gray-500 mt-2 font-semibold">
                <span>{followerData?.data?.followers.length} follower</span>
                {totalVote && <span>{totalVote?.data} votes</span>}
              </h1>
            </div>
          </div>
          {/* right button */}
          {!isYou && (
            <div className="pr-5">
              <button
                onClick={followingHandle}
                className="flex bg-green-500 text-white rounded-lg p-1 items-center gap-2"
              >
                {isFollowIng ? (
                  <>
                    <FaCheck className="text-xl" />{" "}
                    <span className="text-lg font-semibold">Folloing</span>
                  </>
                ) : (
                  <>
                    <FaPlus className="text-xl" />{" "}
                    <span className="text-lg font-semibold">Follow</span>
                  </>
                )}
              </button>
            </div>
          )}
          {isYou && totalVote?.data >= 1 && !userData?.verifyed && (
            <div className="pr-5">
              <button
                onClick={inetiatePayment}
                className="flex bg-green-500  text-white rounded-lg p-1 px-2 items-center gap-2"
              >
                <span className="text-lg font-semibold">Verify Now</span>
              </button>
            </div>
          )}
        </div>

        <hr />

        {/* bio and other post. */}

        <div className="flex  lg:flex-row lg:px-0 px-3 flex-col items-start gap-4 mt-4">
          {/* bio section */}
          <div
            data-aos="fade-right"
            className="lg:w-[40%] lg:sticky top-[-100px] "
          >
            <div className="w-full rounded-xl shadow-md p-3 bg-white min-h-4">
              <h1 className="text-xl font-bold">Intro</h1>

              {updateBio ? (
                <form onSubmit={bioHandle}>
                  <textarea
                    style={{ resize: "none" }}
                    className="w-full min-h-[200px] border p-1"
                    name="bio"
                    defaultValue={userData?.bio}
                  ></textarea>

                  <button
                    disabled={bioLoading}
                    className="flex w-full mt-5 justify-center gap-3 bg-green-500 text-white rounded-lg p-1 items-center"
                  >
                    <MdModeEditOutline className="text-xl" />{" "}
                    <span className="text-lg font-semibold">Update Bio</span>
                  </button>
                </form>
              ) : (
                <div className="mb-4">
                  <p className="mt-4 text-center text-xl font-semibold">Bio</p>
                  <p className="text-center mt-4">{userData?.bio}</p>
                  {isYou && (
                    <button
                      onClick={() => setUpdateBio(true)}
                      className="flex w-full mt-5 justify-center gap-3 bg-green-500 text-white rounded-lg p-1 items-center"
                    >
                      <MdModeEditOutline className="text-xl" />{" "}
                      <span className="text-lg font-semibold">
                        {userData?.bio ? "Edit Bio" : "Add Bio"}
                      </span>
                    </button>
                  )}
                </div>
              )}

              {/* home and designation. */}
              <hr />
              <section className="mt-6 flex flex-col gap-3">
                {userData?.educationInstitute && (
                  <div className="flex gap-3">
                    <PiStudentBold className="text-3xl text-gray-500" />
                    <div className="text-base font-semibold">
                      <span>Study at {userData?.educationInstitute}</span>
                    </div>
                  </div>
                )}

                {userData?.address && (
                  <div className="flex gap-3">
                    <IoHomeSharp className="text-2xl text-gray-500" />
                    <div className="text-base font-semibold">
                      <span>Live in {userData?.address}</span>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <MdEmail className="text-2xl text-gray-500" />
                  <div className="text-base font-semibold">
                    <input
                      className="focus:outline-none"
                      defaultValue={userData?.email}
                      type="text"
                      disabled
                    />
                  </div>
                </div>

                {userData?.phone && (
                  <div className="flex gap-3">
                    <FaPhoneAlt className="text-2xl text-gray-500" />
                    <div className="text-base font-semibold">
                      <span>{userData?.phone}</span>
                    </div>
                  </div>
                )}

                {isYou && (
                  <button
                    onClick={() =>
                      document.getElementById("Update_modal")?.showModal()
                    }
                    className="flex w-full mt-4 justify-center gap-3 bg-green-500 text-white rounded-lg p-1 items-center"
                  >
                    <MdModeEditOutline className="text-xl" />{" "}
                    <span className="text-lg font-semibold">Edit Details</span>
                  </button>
                )}
              </section>
            </div>

            {/* followers */}

            <section className="w-full rounded-xl shadow-md p-3 bg-white min-h-4 mt-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Follower</h1>
                {followerData?.data?.followers.length > 0 && (
                  <button
                    onClick={() =>
                      document.getElementById("Followers_modal")?.showModal()
                    }
                    className="text-lg text-green-500 font-medium"
                  >
                    See all follower
                  </button>
                )}
              </div>

              {/* showing followers. */}

              {followerData?.data?.followers.length > 0 ? (
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {followerData?.data?.followers.slice(-9).map((item) => {
                    return (
                      <Link
                        key={item?._id}
                        href={`profile?id=${item?.follower?._id}`}
                      >
                        <Image
                          className="w-full h-[200px] object-cover rounded-lg"
                          src={item?.follower?.img}
                          alt="follwerImage"
                          height={300}
                          width={300}
                        ></Image>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center">No Followers</p>
              )}
            </section>

            {/* Following */}

            <section className="w-full rounded-xl shadow-md p-3 bg-white min-h-4 mt-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Following</h1>
                {followerData?.data?.following.length > 0 && (
                  <button
                    onClick={() =>
                      document.getElementById("Following_modal")?.showModal()
                    }
                    className="text-lg text-green-500 font-medium"
                  >
                    See all following
                  </button>
                )}
              </div>

              {/* showing following. */}

              {followerData?.data?.following.length > 0 ? (
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {followerData?.data?.following.slice(-9).map((item) => {
                    return (
                      <Link
                        key={item?._id}
                        href={`profile?id=${item?.following?._id}`}
                      >
                        <Image
                          className="w-full h-[200px] object-cover rounded-lg"
                          src={item?.following?.img}
                          alt="follwerImage"
                          height={300}
                          width={300}
                        ></Image>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center">No following</p>
              )}
            </section>
          </div>

          {/* posts. */}
          <div data-aos="fade-left" className="lg:w-[60%] w-full ">
            {/* create a post section */}

            {isYou && <PostCreate userData={userData} />}

            {/* favourite posts. */}
            {isYou && (
              <section className="bg-white mt-4 rounded-xl shadow-lg p-4">
                <h1 className="text-xl font-bold">Favourite Posts</h1>
                <div className="grid grid-cols-2 lg:grid-cols-3 mt-4 gap-5">
                  {postData?.data?.favourite?.map((item, idx) => (
                    <FavouritePostCard
                      data-aos="fade-up"
                      key={idx}
                      data={item}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* post cards. */}

            <section>
              <div className="grid grid-cols-1 mt-4 gap-5">
                {postData?.data?.all?.map((item, idx) => (
                  <PostCard data-aos="fade-up" key={idx} data={item} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* daisy ui. */}

      <dialog id="Followers_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <div className="flex flex-col gap-3 mt-5">
            {followerData?.data?.followers?.slice(-3)?.map((item) => {
              return (
                <Link
                  key={item?._id}
                  href={`profile?id=${item?.follower?._id}`}
                >
                  <div className="flex items-center gap-4 bg-gray-100 rounded-lg p-1">
                    <Image
                      className="w-[50px] h-[50px] object-cover rounded-lg"
                      src={item?.follower?.img}
                      alt="follwerImage"
                      height={300}
                      width={300}
                    ></Image>
                    <h1 className="font-semibold">{item?.follower?.name}</h1>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </dialog>

      <dialog id="Following_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <div className="flex flex-col gap-3 mt-5">
            {followerData?.data?.following?.slice(-3)?.map((item) => {
              return (
                <Link
                  key={item?._id}
                  href={`profile?id=${item?.following?._id}`}
                >
                  <div className="flex items-center gap-4 bg-gray-100 rounded-lg p-1">
                    <Image
                      className="w-[50px] h-[50px] object-cover rounded-lg"
                      src={item?.following?.img}
                      alt="follwerImage"
                      height={300}
                      width={300}
                    ></Image>
                    <h1 className="font-semibold">{item?.following?.name}</h1>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </dialog>

      <dialog id="Update_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <form onSubmit={detailsHandle} className="flex flex-col gap-3">
            <InputField
              dValue={userData?.educationInstitute}
              name="education"
              className="border-2"
              placeholder="Education Institute"
              type="text"
            />
            <InputField
              dValue={userData?.address}
              name="address"
              className="border-2"
              placeholder="Address"
              type="text"
            />
            <InputField
              dValue={userData?.phone}
              name="phone"
              className="border-2"
              placeholder="Phone Number"
              type="number"
            />
            <Button disable={detailsLoading} text="Update" />
          </form>
        </div>
      </dialog>

      {/*  */}
    </Tocenter>
  );
};

// Use dynamic import with SSR disabled
const Profile = dynamic(() => Promise.resolve(ProfileComponent), {
  ssr: false,
});

export default Profile;
