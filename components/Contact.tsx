"use client"
import { useState } from 'react';
import { Phone, Mail, Facebook, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Form validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            toast.error('Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        // In a real application, you would send the form data to a server here
        console.log('Form submitted:', formData);

        // Reset form
        setFormData({ name: '', email: '', subject: '', message: '' });

        // Show success message
        toast.success('Message sent successfully! We will get back to you soon.', {
            iconTheme: {
                primary: '#FF6900',
                secondary: '#fff'
            }
        });
    };

    return (
        <section id="contact" className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
                    <div className="h-1 w-24 bg-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Have questions or want to join our club? Reach out to us!</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">
                    <div className="flex-1 bg-gradient-to-br from-orange-50 to-blue-50 p-8 rounded-xl shadow-lg">
                        <h3 className="text-2xl font-bold text-orange-500 mb-6">Get In Touch</h3>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="bg-orange-100 p-3 rounded-full mr-4">
                                    <Phone size={24} className="text-orange-500" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 mb-1">Phone</h4>
                                    <p className="text-gray-600">9748809637</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-orange-100 p-3 rounded-full mr-4">
                                    <Mail size={24} className="text-orange-500" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 mb-1">Email</h4>
                                    <p className="text-gray-600 break-words">nextgeninnovatorsofficial@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-orange-100 p-3 rounded-full mr-4">
                                    <Facebook size={24} className="text-orange-500" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 mb-1">Facebook</h4>
                                    <p className="text-gray-600">NextGen Innovator Club - BKC</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-orange-100 p-3 rounded-full mr-4">
                                    <MapPin size={24} className="text-orange-500" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 mb-1">Location</h4>
                                    <p className="text-gray-600">Butwal-10, Rupandehi</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Enter subject"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                                <textarea
                                    id="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Type your message here"
                                    rows={5}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors duration-200"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
