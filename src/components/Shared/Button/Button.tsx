import { FC } from 'react';

interface ButtonProps {
    text: string;
    onClick?: () => void; // Function type for onClick
    disable?: boolean;   // Optional boolean type for disable
    className?: string;  // Optional string type for className
    loading?: boolean;  // Optional string type for className
    type?: "submit" | "reset" | "button" ;  // Optional string type for className
  }

const Button: FC<ButtonProps> = ({text,onClick,disable,className,loading,type='submit'}) => {
    return (
        <button type={type} disabled={disable?true:false} onClick={onClick} className={`font-bold btn hover:bg-[#26ad2d] bg-[#19f123] border-none text-white p-2 rounded-xl ${className}`}>
           {loading?<div className='to-center gap-3'>{text}<span className="loading loading-spinner loading-sm"></span></div>:text}
        </button>
    );
};

export default Button; 