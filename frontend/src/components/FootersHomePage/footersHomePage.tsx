import React from 'react';

const Footer = () => {
return (
<footer className="bg-gray-800 text-white p-4 text-center">
    <div className="max-w-screen-lg mx-auto flex flex-col items-center gap-8 md:flex-row md:justify-around md:items-start">
    <div className="text-center md:text-left md:w-1/3">
        <h2 className="text-white font-bold mb-3">WanderWise</h2>
        <p className="text-gray-400 text-sm hover:text-white transition-colors">
        Plan your perfect journey effortlessly.
        </p>
    </div>
    
    <div className="flex flex-col gap-3 md:flex-row md:w-2/3 md:justify-around">
        <div className="text-center md:text-left">
        <h3 className="text-white font-bold mb-2">Resources</h3>
        <ul className="list-none p-0 m-0">
            <li className="text-gray-400 text-sm mb-2 hover:text-white transition-colors cursor-pointer">Help Center</li>
            <li className="text-gray-400 text-sm mb-2 hover:text-white transition-colors cursor-pointer">Tutorials</li>
            <li className="text-gray-400 text-sm mb-2 hover:text-white transition-colors cursor-pointer">API Documentation</li>
        </ul>
        </div>
        
        <div className="text-center md:text-left">
        <h3 className="text-white font-bold mb-2">Company</h3>
        <ul className="list-none p-0 m-0">
            <li className="text-gray-400 text-sm mb-2 hover:text-white transition-colors cursor-pointer">About Us</li>
            <li className="text-gray-400 text-sm mb-2 hover:text-white transition-colors cursor-pointer">Careers</li>
            <li className="text-gray-400 text-sm mb-2 hover:text-white transition-colors cursor-pointer">Contact</li>
        </ul>
        </div>
    </div>
    </div>
    
    <p className="text-center text-sm text-gray-400 mt-8">
    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="mx-2">
        <i className="fab fa-facebook hover:text-white transition-colors"></i>
    </a>
    &copy; 2024 WanderWise. All Rights Reserved.
    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="mx-2">
        <i className="fab fa-instagram hover:text-white transition-colors"></i>
    </a>
    </p>
</footer>
);
};

export default Footer;
