"use client"
import { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    return (
        <footer className="bg-gray-900 text-white pt-16 pb-6">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    <div className="space-y-4">

                        <div className="flex items-center gap-3 mb-4">
                            <Image
                                src="/logo.png"
                                alt="NextGen Innovator Club Logo"
                                width={200}
                                height={200}
                                className="h-12 w-12 rounded-full object-cover"
                            />
                            <h3 className="text-xl font-bold">NextGen Innovator Club</h3>
                        </div>
                        <p className="text-gray-400">
                            Empowering the next generation of tech innovators and creative problem solvers.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-orange-500 mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Home</a></li>
                            <li><a href="#about" className="text-gray-400 hover:text-white transition-colors duration-200">About</a></li>
                            <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors duration-200">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-orange-500 mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li><a href="#events" className="text-gray-400 hover:text-white transition-colors duration-200">Events</a></li>
                            <li><a href="/members" className="text-gray-400 hover:text-white transition-colors duration-200">Members</a></li>
                            <li><a href="/entrance" className="text-gray-400 hover:text-white transition-colors duration-200">Entrance</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-orange-500 mb-4">Contact</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center">
                                <Phone size={16} className="mr-2 text-orange-500" />
                                <span className="text-gray-400">+977 9748809637</span>
                            </li>
                            <li className="flex items-start">
                                <Mail size={16} className="mr-2 mt-1 text-orange-500" />
                                <span className="text-gray-400 break-words">nextgeninnovatorsofficial@gmail.com</span>
                            </li>
                            <li className="flex items-center">
                                <MapPin size={16} className="mr-2 text-orange-500" />
                                <span className="text-gray-400">Butwal-10, Rupandehi</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500">&copy; {currentYear} NextGen Innovator Club. All rights reserved.</p>
                    <p className="text-gray-500">Established 2024 at Butwal Kalika Campus</p>
                    <div className="links flex gap-4">

                        <Link href="https://github.com/bimal009" className="text-gray-400 hover:text-white transition-colors duration-200">Bimal Pandey</Link>
                        <Link href="https://github.com/Aashish-Chapagain" className="text-gray-400 hover:text-white transition-colors duration-200">Aashish Chapagain</Link>
                        <Link href="https://github.com/ANMOL-CHHETRI" className="text-gray-400 hover:text-white transition-colors duration-200">Anmol Chettri</Link>
                        <Link href="https://github.com/sikharsp" className="text-gray-400 hover:text-white transition-colors duration-200">Sikhar Panthi</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

