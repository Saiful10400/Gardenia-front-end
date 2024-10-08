import React from 'react';
import "./css/authenticationBg.css"
const AuthenticationBg = ({children}) => {
    return (
        <div className='AuthContainer h-[calc(100vh-82px)]'>
            <div className='w-full h-full glassMorphisom flex justify-center items-center'>
            {children}
            </div>
        </div>
    );
};

export default AuthenticationBg;