import React from 'react';
import "./css/authenticationBg.css"
const AuthenticationBg = ({children}) => {
    return (
        <div className='AuthContainer h-[100vh]'>
            <div className='w-full h-full glassMorphisom flex justify-center items-center'>
            {children}
            </div>
        </div>
    );
};

export default AuthenticationBg;