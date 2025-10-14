"use client"

import { useRouter } from "next/navigation";



const Message = () => {
    const move = useRouter()

    move.push("/message/" + Math.random().toString(36))
    return null
};

export default Message;