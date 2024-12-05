import React from "react";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";
import logo from "../../assets/landingPage/logo/logofinalmaybe.png";


export const Navbar = () => {
  React.useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const htmlElement = document.documentElement;

    if (storedTheme === "dark") {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }, []);

  return (
    <div className="shadow-xl fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 z-50 flex items-center justify-between px-4 py-2">
      <div className="flex items-center gap-2">
        <Link
          to="/"
          className="text-md font-extrabold flex items-center hover:text-amber-500 dark:text-white"
        >
          WanderWise
        </Link>
        <img src={logo} alt="Logo" className="h-8 w-8 object-contain" />
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/signin"
          className="btn btn-ghost text-xl text-gray-800 dark:text-white"
        >
          Sign In
        </Link>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};
