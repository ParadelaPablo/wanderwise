import React, { useState, useEffect } from "react";
import screen1 from "../../assets/screen1.png";
import screen2 from "../../assets/screen2.png";
import screen3 from "../../assets/screen3.png";

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
<div className="flex justify-center items-center w-full h-full p-4">
    <div className="relative rounded-xl w-full max-w-5xl mx-auto h-full overflow-hidden rounded-lg shadow-lg">
    {images.map((image, index) => (
        <img
        key={index}
        src={image}
        alt={`Slide ${index + 1}`}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
        }`}
        />
    ))}

    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
        <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
            index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
        ></button>
        ))}
    </div>
    </div>
</div>
);
};

export default Banner;
