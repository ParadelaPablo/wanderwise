import React from "react";
import appStore from "../../assets/landingPage/stores/priceAppStore.png";
import googlePlay from "../../assets/landingPage/stores/pricePlayStore.png";

const Stores: React.FC = () => {
return (
<div className="flex flex-col items-center gap-4 mt-4 w-full mb-5 p-4 md:flex-row md:justify-between md:items-center md:gap-8 lg:gap-12 xl:gap-16">
    
    <img
    src={appStore}
    alt="App Store"
    className="w-full h-auto object-contain m-3 md:w-1/3"
    />
    
    <div className="flex gap-4 justify-center m-4 flex-wrap md:order-none md:w-1/3 md:mx-auto lg:flex-row lg:items-center lg:mx-8">
    <a
        href="https://apps.apple.com/"
        target="_blank"
        rel="noopener noreferrer"
    >
        <img
        src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
        alt="Download on the App Store"
        className="h-16 w-44 md:h-20 lg:h-24 lg:w-52"
        />
    </a>
    <a
        href="https://play.google.com/store"
        target="_blank"
        rel="noopener noreferrer"
    >
        <img
        src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
        alt="Get it on Google Play"
        className="h-16 w-44 md:h-20 lg:h-24 lg:w-52"
        />
    </a>
    </div>
    
    <img
    src={googlePlay}
    alt="Google Play"
    className="w-full h-auto object-contain m-3 md:w-1/3"
    />
    
</div>
);
};

export default Stores;
