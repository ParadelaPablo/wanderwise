import React from "react";
import { FaStar } from "react-icons/fa";

const ReviewsCarousel: React.FC = () => {
const reviews = [
{
    name: "John Doe",
    image:
    "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp",
    text: "This app made my road trip planning so much easier. I could easily map out my stops and explore places I wouldn't have discovered otherwise. Totally recommended!",
},
{
    name: "Jane Smith",
    image:
    "https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp",
    text: "A fantastic tool for planning your perfect journey! The app is very intuitive, and it helped me find hidden gems along my route that made my trip unforgettable.",
},
{
    name: "Emily Johnson",
    image:
    "https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp",
    text: "I love the clean interface and the simplicity of the app. It makes planning road trips fun, and the recommendations for stops are spot-on!",
},
{
    name: "Michael Brown",
    image:
    "https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp",
    text: "I used this app for my recent road trip, and it was such a game changer! From picking spots to stay to finding the best routes, everything was covered.",
},
];

return (
<div className="flex justify-center p-4">
    <div className="carousel shadow-xl border carousel-center bg-neutral rounded-xl max-w-md md:max-w-2xl lg:max-w-7xl space-x-4 p-4 m-4">
    {reviews.map((review, index) => (
        <div
        key={index}
        className="carousel-item w-64 md:w-80 lg:w-96 h-auto bg-base-100 rounded-lg p-4 shadow-lg mx-auto"
        >
        <div className="flex flex-col md:flex-row items-center justify-center h-full md:gap-4 lg:gap-6">
            <img
            src={review.image}
            alt={review.name}
            className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full mb-3 md:mb-0"
            />
            <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400" />
                ))}
            </div>
            <h3 className="text-lg font-bold mb-2 text-center md:text-left">
                {review.name}
            </h3>
            <p className="text-sm text-gray-800 text-center md:text-left">
                {review.text}
            </p>
            </div>
        </div>
        </div>
    ))}
    </div>
</div>
);
};

export default ReviewsCarousel;
