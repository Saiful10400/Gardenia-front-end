"use client";
import Tocenter from "@/components/Helper/Tocenter";
import Loading from "@/components/Component/Loading/Loading";
import {
  useAllFriendRefQuery,
  useAPageAllPostsQuery,
  useAPageDetailsQuery,
  useAPageMembersQuery,
  usePageInvitationSendMutation,
  useUpdatePageMutation,
} from "@/Redux/api/api";
import { Edit,  Plus } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useAppSelector } from "@/Redux/hoocks/Convaying";
import { MdEmail, MdModeEditOutline } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { IoHomeSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import PostCreate from "@/components/Component/PostCreate/PostCreate";
import FavouritePostCard from "@/components/Component/FavouritePostcard/FavouritePostCard";
import PostCard from "@/components/Component/PostCard/PostCard";

type TpageData = {
  _id: string;
  admin: {
    _id: string;
    name: string;
    img: string;
    email: string;
    password: string;
    phone: string;
    role: string;
    coverImg: string;
    bio: string;
    profession: string | null;
    educationInstitute: string;
    address: string;
    socialLinks: Array<{ platform?: string; url?: string }>;
    createdAt: string;
    updatedAt: string;
    __v: number;
    verifyed: boolean;
    isBlocked: boolean;
  };
  logo: string;
  coverImg: string;
  isRead: boolean;
  name: string;
  memberCount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
type Tuser = {
  _id: string;
  name: string;
  img: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  coverImg: string;
  bio: string;
  profession: string | null;
  educationInstitute: string;
  address: string;
  socialLinks: string[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
  verifyed: boolean;
  isBlocked: boolean;
};

const SinglePageDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data, isLoading } = useAPageDetailsQuery(id);
  const page: TpageData = data?.data?.result;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenUpdatePage,
    onOpen: onOpenUpdatePage,
    onOpenChange: onOpenChangeUpdatePage,
  } = useDisclosure();

  const { loggedInUser } = useAppSelector((s) => s.authStore);

  const { data: allFrind } = useAllFriendRefQuery(loggedInUser?._id);
  const allFriends: Tuser[] = allFrind?.data?.map((item) => {
    if (item.sender?._id !== loggedInUser?._id) {
      return item.sender;
    } else if (item.receiver?._id !== loggedInUser?._id) {
      return item.receiver;
    }
  });

  const { data: members } = useAPageMembersQuery(id);

  // invitation handle.
  const [sendInvitation] = usePageInvitationSendMutation();
  const handleInvite = (userId: string) => {
   
    sendInvitation({ page: id, user: userId });
  };

  // bio and page posts handle.

  const isYou = true;
  
 
  
 


// update page bio.
const[updatePage]=useUpdatePageMutation()

const pageDetailsUpdateHandle=(e)=>{
  e.preventDefault()
  const description=e.target.pageBio.value
  updatePage({body:{description},id})
}



// retrieve page all posts.
const {data:pageAllPosts}=useAPageAllPostsQuery(id)
 


  return isLoading ? (
    <Loading />
  ) : (
    <Tocenter>
      <div className="bg-gray-100 lg:w-[80%] mx-auto">
        {/* top cover photo and profile photo. */}

        <div className="relative h-[40vh]">
          <Image
            src={page.coverImg}
            alt="coverPhoto"
            className="w-full object-cover rounded-lg h-full"
            height={300}
            width={1900}
          ></Image>
        </div>

        {/* profile and cover photos section. */}

        <div className="flex flex-col lg:flex-row items-center lg:pb-0 pb-4 bg-white justify-between ">
          <div className="flex items-center justify-end gap-5 lg:gap-14">
            <div className="lg:w-[174px] w-[130px] bg-white p-2 relative lg:left-11 -top-[30px] rounded-full lg:h-[174px] h-[130px]">
              <Image
                src={page.logo}
                alt="coverPhoto"
                className="w-full rounded-full object-cover h-full"
                height={170}
                width={170}
              ></Image>
            </div>
            <div className=" ">
              <h1 className="text-4xl font-bold flex gap-3 items-end">
                <span>{page.name}</span>
              </h1>
              <h1 className="text-base flex items-center gap-4 text-gray-500 mt-2 font-semibold">
                <span>{data?.data?.memberCount} members</span>
              </h1>
            </div>
          </div>
          {/* top button section. */}
          <section className="flex items-center gap-5">
            {" "}
            <Button
              onPress={onOpenChangeUpdatePage}
              className="lg:mr-5 bg-[#22c55e] font-semibold text-lg text-white flex items-center px-2 py-1 rounded-md"
            >
              <Edit /> Edit
            </Button>
            <Button
              onPress={onOpen}
              className="lg:mr-5 bg-[#22c55e] font-semibold text-lg text-white flex items-center px-2 py-1 rounded-md"
            >
              <Plus /> Invite
            </Button>
          </section>
          {/* update modal. */}
          <Modal
            isOpen={isOpenUpdatePage}
            onOpenChange={onOpenChangeUpdatePage}
          >
            <ModalContent>
              {() => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Update Page Information
                  </ModalHeader>
                  <ModalBody>
                    <form onSubmit={pageDetailsUpdateHandle} className="w-full">
                      <textarea defaultValue={data?.data?.result?.description}
                      name="pageBio"
                        className="resize-none w-full min-h-[200px] pl-2 py-2 border border-gray-400 rounded-md focus:outline-none"
                        placeholder="Page bio."
                      />
                      <Button type="submit" className="lg:mr-5 bg-[#22c55e] font-semibold text-sm text-white flex items-center px-1 py-1 rounded-md">
                        Update
                      </Button>
                    </form>
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {() => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Friend list dsfsdfsdf
                  </ModalHeader>
                  <ModalBody>
                    {allFriends?.map((item: Tuser) => {
                      const hidden = members?.data?.activeUser?.find(
                        (element) => element?.user === item?._id
                      )
                        ? true
                        : false;
                      const invited = members?.data?.pendingUser?.find(
                        (element) => element?.user === item?._id
                      )
                        ? true
                        : false;

                      return (
                        <div
                          key={item._id}
                          className={`flex justify-between items-center rounded-md p-2 hover:bg-gray-300 ${
                            hidden ? "hidden" : "block"
                          }`}
                        >
                          {" "}
                          <Image
                            className="w-[50px] h-[50px] rounded-full object-cover"
                            alt="profile image"
                            width={70}
                            height={70}
                            src={item.img}
                          ></Image>
                          <h1 className="font-semibold">{item.name}</h1>
                          <button
                            disabled={invited}
                            onClick={() => handleInvite(item._id)}
                            className={`lg:mr-5 ${
                              invited ? "bg-gray-400" : "bg-[#22c55e]"
                            } font-semibold text-lg text-white flex items-center px-2 py-1 rounded-md`}
                          >
                            {invited ? "invited" : "invite"}
                          </button>
                        </div>
                      );
                    })}
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>

        {/* bio and page post section. */}

        <div className="flex overflow-hidden lg:flex-row lg:px-0 px-3 flex-col items-start gap-4 mt-4">
          {/* posts. */}
          <div
            data-aos="fade-down"
            className="lg:w-[60%] w-full overflow-hidden"
          >
            {/* create a post section */}

            {isYou && <PostCreate userData={loggedInUser} />}

            {/* post cards. */}

            <section>
              <div className="grid grid-cols-1 mt-4 gap-5">
                {pageAllPosts?.data?.map((item, idx) => (
                  <PostCard data-aos="fade-up" key={idx} data={item} />
                ))}
              </div>
            </section>
          </div>

          {/* bio section */}
          <div
            data-aos="fade-down"
            className="lg:w-[40%] lg:sticky top-[-100px] "
          >
            <div className="w-full rounded-xl shadow-md p-3 bg-white min-h-4">
              <h1 className="text-xl font-semibold">About</h1>
              <p className="text-center mt-4">{data?.data?.result?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </Tocenter>
  );
};

export default SinglePageDetails;
