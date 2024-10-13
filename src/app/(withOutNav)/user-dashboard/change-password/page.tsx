"use client"

import Button from '@/components/Shared/Button/Button';
import InputField from '@/components/Shared/InputField/InputField';
import { useChangePasswordMutation, useLastPassValMutation } from '@/Redux/api/api';
import { useAppSelector } from '@/Redux/hoocks/Convaying';
import React from 'react';
import { toast } from 'react-toastify';

const ChangePassword = () => {

    const[checkCredentials]=useLastPassValMutation()
    const { loggedInUser, isLoading: currentLoading } = useAppSelector(
        (e) => e.authStore
      );

const[chaagePassword]=useChangePasswordMutation()

const handlePass=(e)=>{
    e.preventDefault()
    if(!loggedInUser) return
    const form=e.target
    
    if(form.newPass.value!==form.newPassR.value){
        toast.error("Passwrod doesn't match!", {
            position: "top-center",
          });
          return
    }

else{
    checkCredentials({password:form.oldPass.value,email:loggedInUser?.email}).then(res=>{
        
        if(res.data.data.credential){
            chaagePassword({password:form.newPass.value,email:loggedInUser?.email})
            .then(res=>{
                if(res.data?.data.modifiedCount>=1){
                    toast.success("Password changed successfully!", {
                        position: "top-center",
                      })
                      form.reset()
                }
            })
        }
        else{
           
            toast.error("Old password is wrong!", {
                position: "top-center",
              })
        }
    })
}




}


    return (
        <div data-aos="zoom-in" className='bg-white lg:w-[400px] p-4 rounded-lg'>
            

            <form onSubmit={handlePass} className='flex flex-col gap-4'>
                <InputField name='oldPass' type='password' placeholder='Old Password'/>
                <InputField name='newPass' type='password' placeholder='New Password'/>
                <InputField name='newPassR' type='password' placeholder='Re-type New Password'/>
                <Button className='rounded-sm mt-5 inline-block w-full' text='Submit'/>
            </form>
        </div>
    );
};

export default ChangePassword;