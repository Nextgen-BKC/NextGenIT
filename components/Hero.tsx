import Image from "next/image";

const Hero = () => {
    return (
        <section className="pt-24 pb-12 md:pt-32 md:pb-20 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="flex-1">
                        <h1 className="text-3xl flex flex-col gap-5 text-black md:text-4xl lg:text-5xl font-bold mb-4">
                            <span>
                                Welcome to
                            </span>
                            <span className="text-orange-500">NextGen Innovator Club</span>
                        </h1>
                        <p className="text-gray-600 text-lg mb-8 max-w-lg">
                            Empowering the next generation of tech innovators and creative problem solvers at Butwal Kalika Campus.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a href="#about">
                                <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200">
                                    Learn More
                                </button>
                            </a>
                            <a href="https://www.facebook.com/share/1Ds9cvA2Km/">
                                <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200">
                                    Join Our Community
                                </button>
                            </a>
                        </div>
                    </div>
                    <div className="flex-1 relative">
                        <div className="absolute inset-0 bg-orange-500 rounded-full blur-3xl opacity-20 transform -translate-x-1/4 -translate-y-1/4"></div>
                        <div className="relative z-10 w-full max-w-md mx-auto drop-shadow-xl">
                            <Image
                                src="/logo.png"
                                alt="NextGen Innovator Club"
                                width={1000}
                                height={1000}
                                className="w-3/4 md:w-full h-auto object-contain mx-auto"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;