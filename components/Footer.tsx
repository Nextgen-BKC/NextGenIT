"use client"
import { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
    const [currentYear] = useState(new Date().getFullYear());

    return (
        <footer className="bg-gray-900 text-white pt-12 pb-6 md:pt-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-10">
                    {/* Logo Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                            <Image
                                src="/logo.png"
                                alt="NextGen Innovator Club Logo"
                                width={48}
                                height={48}
                                className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover"
                            />
                            <h3 className="text-lg md:text-xl font-bold leading-tight">
                                NextGen Innovator Club
                            </h3>
                        </div>
                        <p className="text-gray-400 text-sm md:text-base">
                            Empowering the next generation of tech innovators and creative problem solvers.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold text-orange-500 mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm md:text-base">Home</a></li>
                            <li><a href="#about" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm md:text-base">About</a></li>
                            <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm md:text-base">Contact</a></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-lg font-bold text-orange-500 mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li><a href="#events" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm md:text-base">Events</a></li>
                            <li><a href="/members" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm md:text-base">Members</a></li>
                            <li><a href="/entrance" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm md:text-base">Entrance</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold text-orange-500 mb-4">Contact</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                                <Phone size={18} className="mt-0.5 flex-shrink-0 text-orange-500" />
                                <span className="text-gray-400 text-sm md:text-base">+977 9748809637</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Mail size={18} className="mt-0.5 flex-shrink-0 text-orange-500" />
                                <span className="text-gray-400 text-sm md:text-base break-words">
                                    nextgeninnovatorsofficial@gmail.com
                                </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin size={18} className="mt-0.5 flex-shrink-0 text-orange-500" />
                                <span className="text-gray-400 text-sm md:text-base">Butwal-10, Rupandehi</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
                    <p className="text-gray-500 text-sm order-3 md:order-1 mt-4 md:mt-0">
                        &copy; {currentYear} NextGen Innovator Club. All rights reserved.
                    </p>
                    <p className="text-gray-500 text-sm order-2">
                        Established 2024 at Butwal Kalika Campus
                    </p>
                    <div className="links flex flex-wrap justify-center gap-3 md:gap-4 order-1 md:order-3">
                        <Link target='_blank' href="https://github.com/bimal009" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                            Bimal Pandey
                        </Link>
                        <Link target='_blank' href="https://github.com/Aashish-Chapagain" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                            Aashish Chapagain
                        </Link>
                        <Link target='_blank' href="https://github.com/ANMOL-CHHETRI" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                            Anmol Chettri
                        </Link>

                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;