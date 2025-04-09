"use client";
import React, { useRef, useEffect } from "react";

type messages = {
    userMessage: string;
    Response: string;
}
const Message = ({ userMessage, Response }: string) => {
    const messagesEndRef = useRef(null);

    const messages = [
        { id: 1, sender: { id: 2, name: "Alex Morgan", avatar: "/api/placeholder/40/40" }, text: "Hey there! How's the project coming along?", time: "10:23 AM", isMe: false },
        { id: 2, sender: { id: "me", name: "You", avatar: "/api/placeholder/40/40" }, text: "It's going well! I've completed the initial designs.", time: "10:25 AM", isMe: true },
        { id: 3, sender: { id: 2, name: "Alex Morgan", avatar: "/api/placeholder/40/40" }, text: "That's great news! Can you share them with the team?", time: "10:26 AM", isMe: false },
        { id: 4, sender: { id: "me", name: "You", avatar: "/api/placeholder/40/40" }, text: "Sure thing. I'll upload them to our shared drive and notify everyone.", time: "10:28 AM", isMe: true },
        { id: 5, sender: { id: 2, name: "Alex Morgan", avatar: "/api/placeholder/40/40" }, text: "Perfect! Looking forward to seeing what you've created.", time: "10:30 AM", isMe: false },
    ];

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex bg-transparent items-center justify-center">
            <div className="w-full max-w-md p-6 space-y-6  rounded-lg shadow-lg bg-white ">

                <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px]">
                    {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}>
                            <div className={`flex ${message.isMe ? "flex-row-reverse" : "flex-row"} max-w-xs md:max-w-md`}>

                                <div className={`flex flex-col mx-2 ${message.isMe ? "items-end" : "items-start"}`}>
                                    <div className={`px-4 py-2 rounded-lg shadow-sm ${message.isMe ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-800"}`}>
                                        <p className="text-sm">{message.text}</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div className="bg-white border-t p-4 rounded-b-lg">
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Ask anything about us..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        <button className="ml-2 p-2 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 text-white hover:from-orange-500 hover:to-orange-600">
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