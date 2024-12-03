import React from "react";
import appStore from "../../assets/priceAppStore.png";
import googlePlay from "../../assets/pricePlayStore.png";

const Stores: React.FC = () => {
return (
<div className="flex flex-col items-center gap-4 mt-4 w-full mb-5">
    <img
    src={appStore}
    alt="App Store"
    className="w-full h-auto object-contain m-3"
    />
    
    <div className="flex gap-4 justify-center m-4">
    <a
        href="https://apps.apple.com/"
        target="_blank"
        rel="noopener noreferrer"
    >
        <img
        src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
        alt="Download on the App Store"
        className="h-16 w-auto"
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
        className="h-16 w-auto"
        />
    </a>
    </div>

    <img
    src={googlePlay}
    alt="Google Play"
    className="w-full h-auto object-contain m-3"
    />
</div>
);
};

export default Stores;
