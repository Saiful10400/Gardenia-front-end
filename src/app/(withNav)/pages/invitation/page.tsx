"use client"
import { useGetAUserAllPageInvitationQuery, useResponseInviteMutation } from '@/Redux/api/api';
import { useAppSelector } from '@/Redux/hoocks/Convaying';
import Image from 'next/image';
import React from 'react';

type Tinvitation = {
    _id: string;
    user: string; // Reference to a user ID
    page: {
        _id: string;
        admin: string; // Reference to an admin ID
        logo: string; // URL of the page's logo
        coverImg: string; // URL of the page's cover image
        isRead: boolean; // Whether the page is marked as read
        name: string; // Name of the page
        createdAt: string; // ISO date string for page creation
        updatedAt: string; // ISO date string for page update
        __v: number; // Version key for the page
    };
    role: string; // Role of the user for the page
    accept: boolean; // Whether the user has accepted the role
    createdAt: string; // ISO date string for user role creation
    updatedAt: string; // ISO date string for user role update
    __v: number; // Version key for the user role
};


const Invitation = () => {
      const { loggedInUser } = useAppSelector((e) => e.authStore);
      const { data } = useGetAUserAllPageInvitationQuery(loggedInUser._id);
      const invitation:Tinvitation[]=data?.data

      const[modifyInvitationSend]=useResponseInviteMutation()
const modifyInvitation=(id:string,status:boolean)=>{
modifyInvitationSend({id,status})
}



    return (
   
            <div className="grid grid-cols-2 lg:grid-cols-8 lg:gap-5 gap-3">
                            {invitation?.map((item: Tinvitation) => (
                              <div
                                key={item._id}
                                className="rounded-b-md shadow-lg w-full pb-2  bg-white "
                              >
                                <Image
                                  src={item.page.logo}
                                  alt="page logo"
                                  width={200}
                                  height={200}
                                 className="rounded-t-md h-[200px] w-full object-cover block"
                                />
                  
                                <div>
                                  <h1 className="lg:text-lg text-base font-semibold text-center mt-4">{item.page.name}</h1>
                  
                                  <div className="flex flex-col  items-center gap-2 mt-2 px-2">
                                    <button
                                      onClick={() =>
                                        modifyInvitation(item._id,true)
                                      }
                                      className="text-base w-full font-semibold bg-[#25a82b] text-white px-4 py-1 rounded-md"
                                    >
                                      Confirm
                                    </button>
                                    <button
                                      onClick={() =>
                                        modifyInvitation(item._id,false)
                                      }
                                      className="text-base w-full font-semibold bg-[#e2e5e9]  px-4 py-1 rounded-md"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
    
    );
};

export default Invitation;