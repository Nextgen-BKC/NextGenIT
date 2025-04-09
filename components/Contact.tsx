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
        <section id="contact" className="py-12 md:py-20 lg:py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
                        Contact Us
                    </h2>
                    <div className="h-1 w-20 md:w-24 bg-orange-500 mx-auto mb-3 md:mb-4"></div>
                    <p className="text-gray-600 text-sm md:text-base">
                        Have questions or want to join our club? Reach out to us!
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 md:gap-10">
                    {/* Contact Info Section */}
                    <div className="flex-1 bg-gradient-to-br from-orange-50 to-blue-50 p-6 md:p-8 lg:p-10 rounded-xl shadow-lg">
                        <h3 className="text-xl md:text-2xl font-bold text-orange-500 mb-4 md:mb-6">
                            Get In Touch
                        </h3>

                        <div className="space-y-4 md:space-y-6">
                            {[
                                { icon: Phone, text: '9748809637', title: 'Phone' },
                                { icon: Mail, text: 'nextgeninnovatorsofficial@gmail.com', title: 'Email' },
                                { icon: Facebook, text: 'NextGen Innovator Club - BKC', title: 'Facebook' },
                                { icon: MapPin, text: 'Butwal-10, Rupandehi', title: 'Location' }
                            ].map((item, index) => (
                                <div key={index} className="flex items-start gap-3 md:gap-4">
                                    <div className="bg-orange-100 p-2 md:p-3 rounded-full flex-shrink-0">
                                        <item.icon className="h-5 w-5 md:h-6 md:w-6 text-orange-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm md:text-base font-semibold text-gray-800 mb-1">
                                            {item.title}
                                        </h4>
                                        <p className="text-gray-600 text-sm md:text-base break-words">
                                            {item.text}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Form Section */}
                    <div className="flex-1">
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm md:text-base text-gray-700 font-medium mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    className="w-full p-2 md:p-3 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm md:text-base text-gray-700 font-medium mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="w-full p-2 md:p-3 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm md:text-base text-gray-700 font-medium mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Enter subject"
                                    className="w-full p-2 md:p-3 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm md:text-base text-gray-700 font-medium mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Type your message here"
                                    rows={4}
                                    className="w-full p-2 md:p-3 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-orange-600 text-white py-2 md:py-3 rounded-lg hover:bg-orange-700 transition-colors duration-200 text-sm md:text-base font-medium focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
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