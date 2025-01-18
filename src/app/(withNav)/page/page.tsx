"use client";
import Tocenter from "@/components/Helper/Tocenter";
import Loading from "@/components/Shared/Loading/Loading";
import {
  useAllFriendRefQuery,
  useAPageDetailsQuery,
  useAPageMembersQuery,
  usePageInvitationSendMutation,
  useResponseInviteMutation,
} from "@/Redux/api/api";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useAppSelector } from "@/Redux/hoocks/Convaying";

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
console.log(members)
  // invitation handle.
  const [sendInvitation] = usePageInvitationSendMutation();
  const handleInvite = (userId: string) => {
    sendInvitation({ page: id, user: userId });
  };

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

        {/* profile section. */}

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

          <Button
            onPress={onOpen}
            className="lg:mr-5 bg-[#22c55e] font-semibold text-lg text-white flex items-center px-2 py-1 rounded-md"
          >
            <Plus /> Invite
          </Button>

          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {() => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Friend list
                  </ModalHeader>
                  <ModalBody>
                    {allFriends?.map((item: Tuser) => {
                        const hidden=members?.data?.activeUser?.find(element=>element?.user===item?._id)?true:false
                        const invited=members?.data?.pendingUser?.find(element=>element?.user===item?._id)?true:false
                        
                      return (
                        <div 
                          key={item._id}
                          className={`flex justify-between items-center rounded-md p-2 hover:bg-gray-300 ${hidden?"hidden":"block"}`}
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
                          <button disabled={invited}  onClick={()=>handleInvite(item._id)} className={`lg:mr-5 ${invited?"bg-gray-400":"bg-[#22c55e]"} font-semibold text-lg text-white flex items-center px-2 py-1 rounded-md`}>
                            {invited?"invited":"invite"}
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
      </div>
    </Tocenter>
  );
};

export default SinglePageDetails;
