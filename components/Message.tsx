"use client";
import React, { useRef, useEffect, useState } from "react";
import { Gemini } from "@/lib/gemini/Gemini";
import Image from "next/image";
import { X } from "lucide-react";

const formatBold = (text: string) => {
    // Replace ***text*** or **text** with <strong>text</strong>
    let formatted = text
        .replace(/\*\*\*(.+?)\*\*\*/g, '<strong>$1</strong>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Convert markdown-style unordered lists to HTML lists
    // Handles lines starting with * or - followed by a space
    if (/^(\s*([*-])\s+)/m.test(formatted)) {
        // Split into lines, wrap list items, then join
        formatted = formatted.replace(/(^|\n)([ \t]*)([*-]) ([^\n]+)/g, '$1$2<li>$4</li>');
        // Wrap consecutive <li> in <ul>
        // Workaround for dotAll: [\s\S] matches any character including newlines
        formatted = formatted.replace(/(<li>[\s\S]*?<\/li>)/g, match => `<ul>${match}</ul>`);
        // Merge adjacent <ul>s
        formatted = formatted.replace(/<\/ul>\s*<ul>/g, '');
    }
    return formatted;
};

const Message = () => {
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [inputText, setInputText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState<{
        id: number;
        sender: { id: string | number; name: string; avatar: string };
        text: string;
        time: string;
        isMe: boolean;
        error?: boolean;
    }[]>([
        {
            id: 1,
            sender: { id: "bkc-bot", name: "BKC Assistant", avatar: "/bkc-logo.png" },
            text: "Hello! I'm your BKC Assistant. How can I help you today? Feel free to ask about our programs, facilities, admissions, or anything about Butwal Kalika Campus! 👋",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            isMe: false
        }
    ]);
    const [error, setError] = useState<string | null>(null);
    const [visible, setVisible] = useState(true);
    // Most Asked Questions (full list)
    const allMostAskedQuestions = [
        "What programs are offered at Butwal Kalika Campus?",
        "Who is the Chairperson of Butwal Kalika Campus?",
        "Who is the Campus Chief of BKC?",
        "How can I contact the BBS Coordinator?",
        "How can I contact the BCA Coordinator?",
        "How can I contact the B.Ed Coordinator?",
        "Who is the Exam Coordinator at BKC?",
        "Who is the QAA Coordinator?",
        "Who is the HOD of Finance?",
        "Who is the HOD of English?",
        "Who is the HOD of General Management?",
        "Who is the HOD of Economics?",
        "Who is the HOD of Statistics?",
        "What scholarships are available at BKC?",
        "What student support services does the campus provide?",
        "What facilities are available at the campus?",
        "Does Butwal Kalika Campus have a tech or developer club?",
        "What sports facilities does BKC have?",
        "Who are some of the key teaching staff at BKC?",
        "What is the contact number and email of the campus?"
      ];
      
    const [mostAskedQuestions, setMostAskedQuestions] = useState<string[]>([]);
    const [hasSentMessage, setHasSentMessage] = useState(false);

    useEffect(() => {
        // Shuffle and pick 2 random questions
        const shuffled = [...allMostAskedQuestions].sort(() => 0.5 - Math.random());
        setMostAskedQuestions(shuffled.slice(0, 2));
    }, []);

    const handleSendMessage = async (textToSend: string) => {
        if (!textToSend.trim()) return;
        setError(null);

        const userMessage = {
            id: messages.length + 1,
            sender: { id: "me", name: "You", avatar: "/user-avatar.png" },
            text: textToSend,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            isMe: true
        };

        setMessages(prev => [...prev, userMessage]);
        setHasSentMessage(true);
        const currentInput = textToSend;
        setInputText("");
        setIsTyping(true);

        try {
            const botReply = await Gemini(currentInput);
            console.log(botReply);
            setMessages(prev => [
                ...prev,
                {
                    id: prev.length + 1,
                    sender: { id: "bkc-bot", name: "BKC Assistant", avatar: "/bkc-logo.png" },
                    text: botReply,
                    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                    isMe: false
                }
            ]);
        } catch (err: any) {
            setError("Failed to get response. Please try again.");
            setMessages(prev => [
                ...prev,
                {
                    id: prev.length + 1,
                    sender: { id: "bkc-bot", name: "BKC Assistant", avatar: "/bkc-logo.png" },
                    text: "Sorry, I'm having trouble responding right now. Please try again in a moment.",
                    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                    isMe: false,
                    error: true
                }
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(inputText);
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        visible && (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[80vh] max-h-[700px] relative">
                {/* Close Button */}
                <button
                    className="absolute top-3 right-3 z-10 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
                    onClick={() => setVisible(false)}
                    aria-label="Close chat"
                >
                    <X size={24} className="text-gray-100 hover:text-gray-200" />
                </button>
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 text-white">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-white p-1 flex-shrink-0">
                            <Image
                                src="/logo.png"
                                alt="BKC Logo"
                                width={32}
                                height={32}
                                className="w-full h-full object-contain rounded-full"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23f97316'/%3E%3Ctext x='16' y='20' font-family='Arial' font-size='16' fill='white' text-anchor='middle'%3EBKC%3C/text%3E%3C/svg%3E";
                                }}
                            />
                        </div>
                        <div>
                            <h2 className="font-bold text-lg">NextGen Club Assistant</h2>
                            <p className="text-orange-100 text-sm">Always here to help</p>
                        </div>
                    </div>
                </div>

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-4">
                    {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.isMe ? "justify-end" : "justify-start"} animate-fadeIn`}>
                            <div className={`flex ${message.isMe ? "flex-row-reverse" : "flex-row"} items-end ${message.isMe ? "space-x-reverse space-x-3" : "space-x-3"} max-w-[75%]`}>
                                {/* Avatar */}
                                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mb-1">
                                    {message.isMe ? (
                                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                                            U
                                        </div>
                                    ) : (
                                        <Image
                                            src="/logo.png"
                                            alt="BKC Logo"
                                            width={32}
                                            height={32}
                                            className="w-full h-full object-contain bg-white rounded-full"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23f97316' rx='16'/%3E%3Ctext x='16' y='20' font-family='Arial' font-size='12' fill='white' text-anchor='middle'%3EBKC%3C/text%3E%3C/svg%3E";
                                            }}
                                        />
                                    )}
                                </div>

                                {/* Message Bubble */}
                                <div className={`flex flex-col ${message.isMe ? "items-end" : "items-start"}`}>
                                    <div className={`px-4 py-3 rounded-2xl shadow-sm max-w-full ${
                                        message.isMe 
                                            ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-br-md" 
                                            : message.error 
                                                ? "bg-red-50 text-red-800 border border-red-200 rounded-bl-md" 
                                                : "bg-white text-gray-800 border border-gray-200 rounded-bl-md"
                                    }`}>
                                        <p
                                            className="text-sm leading-relaxed whitespace-pre-wrap break-words"
                                            dangerouslySetInnerHTML={{ __html: formatBold(message.text) }}
                                        />
                                    </div>
                                    <p className={`text-xs mt-1 px-2 ${
                                        message.isMe ? "text-gray-500" : "text-gray-400"
                                    }`}>
                                        {message.time}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                        <div className="flex justify-start animate-fadeIn">
                            <div className="flex items-end space-x-3 max-w-[75%]">
                                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mb-1">
                                    <Image
                                        src="/bkc-logo.png"
                                        alt="BKC Logo"
                                        width={32}
                                        height={32}
                                        className="w-full h-full object-contain bg-white rounded-full"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23f97316' rx='16'/%3E%3Ctext x='16' y='20' font-family='Arial' font-size='12' fill='white' text-anchor='middle'%3EBKC%3C/text%3E%3C/svg%3E";
                                        }}
                                    />
                                </div>
                                <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="bg-white border-t border-gray-200 p-4">
                    {/* Most Asked Questions */}
                    {!hasSentMessage && (
                        <div className="mb-3 flex flex-col gap-y-2 pb-2">
                            {mostAskedQuestions.map((q, idx) => (
                                <button
                                    key={idx}
                                    className="px-3 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100 text-sm transition-colors"
                                    onClick={() => handleSendMessage(q)}
                                    type="button"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    )}
                    {error && (
                        <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                            {error}
                        </div>
                    )}
                    <div className="flex items-end space-x-3">
                        <div className="flex-1 relative">
                            <textarea
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your message about BKC..."
                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none overflow-hidden"
                                disabled={isTyping}
                                rows={1}
                                style={{
                                    height: 'auto',
                                    minHeight: '44px',
                                    maxHeight: '128px'
                                }}
                                onInput={(e) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    target.style.height = 'auto';
                                    target.style.height = Math.min(target.scrollHeight, 128) + 'px';
                                }}
                            />
                        </div>
                        <button 
                            onClick={() => handleSendMessage(inputText)}
                            disabled={isTyping || !inputText.trim()}
                            className="p-3 mb-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg flex items-center justify-center flex-shrink-0"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </div>
        )
    );
};

export default Message;