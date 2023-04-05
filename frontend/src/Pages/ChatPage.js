import React, { useEffect, useState } from 'react'
import axios from "axios";

const ChatPage = () => {
    const [chats, setChats] = useState([]);
    const fetchChats = async () => {
        const { data } = await axios.get("/api/chat");
        // console.log(data);
        setChats(data)
    }
    useEffect(() => {
        fetchChats()
    }, [])
    return (
        <div>
            <h1>{chats.map((chat) => (
                <div key={chat._id}>{chat.chatName}</div>
            ))}</h1>
        </div>
    )
}

export default ChatPage