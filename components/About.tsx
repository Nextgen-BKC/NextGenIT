const About = () => {
    return (
        <section id="about" className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl text-black font-bold mb-4">About Our Club</h2>
                    <div className="h-1 w-24 bg-orange-500 mx-auto"></div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1 space-y-6">
                        <div>
                            <h3 className="text-2xl font-bold text-orange-500 mb-3">Who We Are</h3>
                            <p className="text-gray-600">
                                The NextGen Innovator Club at Butwal Kalika Campus is a community of tech enthusiasts,
                                problem solvers, and creative thinkers. Established in 2024, we provide a platform for
                                students to explore their interests in technology, innovation, and entrepreneurship.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-orange-500 mb-3">Our Mission</h3>
                            <p className="text-gray-600">
                                To foster a culture of innovation and technological advancement among students,
                                preparing them to become future leaders and problem solvers in the digital age.
                            </p>
                        </div>
                    </div>

                    <div className="flex-1 relative">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-100 rounded-full"></div>
                        <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-100 rounded-full"></div>

                        <div className="relative bg-white p-8 shadow-xl rounded-xl max-w-sm mx-auto">
                            <h3 className="text-2xl font-bold text-orange-500 mb-3">Est. 2024</h3>
                            <p className="text-gray-600 italic">
                                "Innovation distinguishes between a leader and a follower."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;