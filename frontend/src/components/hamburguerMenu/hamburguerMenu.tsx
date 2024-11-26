import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "@tanstack/react-router";
import Contact from "../contact/contact";

const HamburguerMenu: React.FC = () => {
const { signOut } = useAuth(); 
const navigate = useNavigate(); 

const handleSignOut = async () => {
await signOut(); 
navigate({ to: "/" }); 
};

return (
<div className="navbar bg-base-100">
    <div className="navbar-start">
    <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
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
        <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
        <li>
            <a href="/dashboard">Dashboard</a>
        </li>
        <li>
            <a href="/current-trip">Current trip / Recent trip</a>
        </li>
        <li>
            <a href="/add-trip">Add trip</a>
        </li>
        <li>
            <a href="/settings">Settings</a>
        </li>
        <li>
            <a href="/account">My account</a>
        </li>
        <li>
            <a href="/help">Help</a>
        </li>
        <li>
            <a href="/contact" onClick={Contact}>
            Contact
            </a>
        </li>
        <li>
            <a role="button" onClick={handleSignOut}>
            Sign out
            </a>
        </li>
        </ul>
    </div>
    </div>
</div>
);
};

export default HamburguerMenu;
