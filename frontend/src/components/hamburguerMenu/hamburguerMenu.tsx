import React, { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useRouter } from "@tanstack/react-router";
import logo from "../../assets/landingPage/logo/logofinalmaybe.png";
import ThemeSwitcher from "../ThemeSwitcher/themeSwitcher";

const HamburguerMenu: React.FC = () => {
  const { signOut } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
    router.navigate({ to: "/" });
  };

  const handleNavigation = (path: string) => {
    setIsMenuOpen(false);
    router.navigate({ to: path });
  };

  return (
    <div className="navbar sticky top-0 bg-base-100 z-10 flex justify-between items-center px-4">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            onClick={toggleMenu}
            className="btn btn-ghost btn-circle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>

          {isMenuOpen && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-32 p-2 shadow"
            >
              <li>
                <button onClick={() => handleNavigation("/dashboard")}>
                  {" "}
                  My trips
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation("/dashboard/create")}>
                  Add trip
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation("/settings")}>
                  Settings
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation("/contact")}>
                  Help
                </button>
              </li>
              <li>
                <button onClick={handleSignOut}>Sign out</button>
              </li>
            </ul>
          )}
        </div>
      </div>

      <div className="navbar-end flex items-center gap-4">
        <ThemeSwitcher />

        <div className="dropdown dropdown-bottom dropdown-left">
          <div
            tabIndex={0}
            role="button"
            onClick={toggleMenu}
            className="btn btn-ghost btn-circle min-h-8 w-8 h-8 justify-end items-end flex"
          >
            <img src={logo} alt="Logo" />
          </div>

          {isMenuOpen && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-24 p-2 shadow"
              style={{
                left: "auto",
                right: "0",
              }}
            >
              <li>
                <button >
                  Account
                </button>
              </li>
              <li>
                <button onClick={handleSignOut}>Sign out</button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default HamburguerMenu;
