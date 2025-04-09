"use client";
import React, { useRef, useEffect, useState } from "react";

type MessageType = {
    id: number;
    sender: {
        id: string | number;
        name: string;
        avatar: string;
    };
    text: string;
    time: string;
    isMe: boolean;
};

const Message = () => {
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const [messages, setMessages] = useState<MessageType[]>([
        { id: 1, sender: { id: 2, name: "Alex Morgan", avatar: "/api/placeholder/40/40" }, text: "Hey! How's everything going with the project?", time: "10:23 AM", isMe: false },
        { id: 2, sender: { id: "me", name: "You", avatar: "/api/placeholder/40/40" }, text: "It's going great! I've finished the initial designs.", time: "10:25 AM", isMe: true },
        { id: 3, sender: { id: 2, name: "Alex Morgan", avatar: "/api/placeholder/40/40" }, text: "Awesome! Can you share them with the team?", time: "10:26 AM", isMe: false },
        { id: 4, sender: { id: "me", name: "You", avatar: "/api/placeholder/40/40" }, text: "I'll upload them to the shared drive and let everyone know.", time: "10:28 AM", isMe: true },
        { id: 5, sender: { id: 2, name: "Alex Morgan", avatar: "/api/placeholder/40/40" }, text: "Looking forward to seeing your work!", time: "10:30 AM", isMe: false },
        { id: 6, sender: { id: "me", name: "You", avatar: "/api/placeholder/40/40" }, text: "By the way, have you ever been to Butwal Kalika Campus? It's a great place for learning and has an awesome community!", time: "10:35 AM", isMe: true },
    ]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex bg-transparent items-center justify-center p-2 sm:p-4">
            <div className="w-full max-w-2xl p-4 sm:p-6 space-y-4 sm:space-y-6 rounded-lg shadow-lg bg-white">
                <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-4 max-h-[50vh] sm:max-h-[400px]">
                    {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}>
                            <div className={`flex ${message.isMe ? "flex-row-reverse" : "flex-row"} max-w-[90%] sm:max-w-md`}>
                                <div className={`flex flex-col mx-1 sm:mx-2 ${message.isMe ? "items-end" : "items-start"}`}>
                                    <div className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-sm text-sm sm:text-base ${message.isMe ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-800"}`}>
                                        <p>{message.text}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div className="bg-white border-t p-2 sm:p-4 rounded-b-lg">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Ask anything..."
                            className="flex-1 px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        <button className="p-2 sm:p-2.5 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 text-white hover:from-orange-500 hover:to-orange-600 flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Message;
