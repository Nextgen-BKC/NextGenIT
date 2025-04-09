"use client"
import { useState, useEffect } from 'react';
import { Menu, MessageSquareMore } from 'lucide-react';
import Link from 'next/link';
import Message from './Message';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isWiggling, setIsWiggling] = useState(false);
    const [chatbox, setChatbox] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsWiggling(true);
            setTimeout(() => setIsWiggling(false), 1000);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const closeMenu = () => {
        if (window.innerWidth <= 768) setIsMenuOpen(false);
    };

    return (
        <nav className={`fixed top-0 w-full z-50 bg-white transition-all duration-300 ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}>
            <style jsx>{`
                @keyframes wiggle {
                    0%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(15deg); }
                    75% { transform: rotate(-15deg); }
                }
                .animate-wiggle { animation: wiggle 0.5s ease-in-out; }
            `}</style>

            {/* Chat Box */}
            {chatbox && (
                <div className="fixed top-20 right-10 md:right-10 z-[60] w-[90vw] md:w-96 transition-all duration-300 animate-slide-in">
                    <Message />
                </div>
            )}

            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo Section */}
                    <div className="flex items-center gap-3">
                        <img src="/logo.png" alt="Club Logo" className="h-12 w-12 object-contain" />
                        <div>
                            <h1 className="text-lg font-bold text-gray-800">NextGen Innovator Club</h1>
                            <p className="text-sm text-gray-600">Butwal Kalika Campus</p>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-4 md:gap-6">
                        {/* Desktop Chat Icon */}


                        {/* Mobile Icons */}
                        <div className="md:hidden flex items-center gap-2">
                            <button
                                onClick={() => setChatbox(!chatbox)}
                                className={`px-2 text-gray-600 hover:text-orange-500 ${isWiggling ? 'animate-wiggle' : ''}`}
                            >
                                <MessageSquareMore size={24} />
                            </button>
                            <button
                                onClick={toggleMenu}
                                className="px-2 mr-2 text-gray-600 hover:text-orange-500"
                                aria-label="Toggle menu"
                            >
                                <Menu size={24} />
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <div className={`absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none transition-all duration-300 ${isMenuOpen ? 'block' : 'hidden md:block'}`}>
                            <div className="flex flex-col md:flex-row items-start md:items-center py-4 md:py-0 px-4 md:px-0 space-y-4 md:space-y-0 md:space-x-6">
                                <Link href="#about" onClick={closeMenu} className="nav-link">
                                    About
                                </Link>
                                <Link href="#events" onClick={closeMenu} className="nav-link">
                                    Events
                                </Link>
                                <Link href="#contact" onClick={closeMenu} className="nav-link">
                                    Contact
                                </Link>
                                <Link href="#member" onClick={closeMenu} className="nav-link">
                                    Members
                                </Link>

                                <button
                                    onClick={() => setChatbox(!chatbox)}
                                    className={`hidden md:flex p-2 text-gray-600 hover:text-orange-500 ${isWiggling ? 'animate-wiggle' : ''}`}
                                >
                                    <MessageSquareMore size={24} />
                                </button>
                                <Link
                                    href="/entrance"
                                    onClick={closeMenu}
                                    className="nav-link bg-orange-500 text-white hover:bg-orange-600 px-4 py-2 rounded-md"
                                >
                                    Entrance
                                </Link>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;