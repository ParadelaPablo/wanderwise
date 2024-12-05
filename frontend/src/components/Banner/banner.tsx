import React, { useState, useEffect } from "react";
import screen1 from "../../assets/landingPage/mobile/screen1.png";
import screen2 from "../../assets/landingPage/mobile/screen2.png";
import screen3 from "../../assets/landingPage/mobile/screen3.png";
import detalle1 from "../../assets/landingPage/appshots/high3.png";
import detalle2 from "../../assets/landingPage/appshots/icons3.png";

const Banner: React.FC = () => {
    const images = [screen1, screen2, screen3];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="flex flex-col lg:flex-row items-center w-full p-4 md:min-h-screen">
            <div className="relative w-full max-w-lg md:max-w-2xl h-[350px] md:h-[500px] lg:max-w-xl lg:h-[700px] xl:max-w-2xl xl:h-[800px] 2xl:max-w-1xl 1xl:h-[900px] overflow-hidden rounded-lg mx-auto lg:mx-0 lg:mr-8">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"
                            }`}
                    />
                ))}

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-white" : "bg-gray-400"
                                }`}
                        ></button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col items-center w-full md:w-full lg:w-1/3 lg:flex-grow p-4 mt-8 lg:mt-0">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4 text-center">
                    Discover Amazing Destinations
                </h2>
                <p className="text-gray-600 text-lg lg:text-xl mb-6 text-center lg:text-left">
                    Explore beautiful locations around the world with ease. Wander Wise
                    helps you plan your perfect journey with curated guides, travel tips,
                    and more.
                </p>

                <div className="flex items-center justify-center gap-20 w-full mt-6">
                    <img
                        src={detalle1}
                        alt="Travel Inspiration 1"
                        className="w-[300px] h-[300px] object-cover rounded-lg shadow-xl hidden md:block"
                    />
                    <img
                        src={detalle2}
                        alt="Travel Inspiration 2"
                        className="w-[300px] h-[300px] object-cover rounded-lg shadow-xl hidden 2xl:block"
                    />
                </div>

                <p className="text-gray-600 text-lg lg:text-xl text-center lg:text-left mt-6">
                    Our app features real-time itinerary updates, collaborative planning
                    with friends, and offline access to your saved plans. Wander Wise is
                    designed to make your travel experience smooth and enjoyable, giving
                    you the freedom to explore without worries.
                </p>
            </div>
        </div>
    );
};

export default Banner;
