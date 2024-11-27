import { useAuth } from "@clerk/clerk-react";
import { useRouter } from "@tanstack/react-router";
import logo from "../../assets/logofinalmaybe.png";

<img src={logo} alt="Logo" />


const HamburguerMenu: React.FC = () => {
const { signOut } = useAuth();
const router = useRouter();

const handleSignOut = async () => {
await signOut();
router.navigate({ to: "/" });
};

return (
<div className="navbar bg-base-100 flex justify-between items-center px-4">
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
            <button onClick={() => router.navigate({ to: "/dashboard" })}>
            Dashboard
            </button>
        </li>
        <li>
            <button>Current trip / Recent trip</button>
        </li>
        <li>
            <button onClick={() => router.navigate({ to: "/dashboard/create" })}>
            Add trip
            </button>
        </li>
        <li>
            <button onClick={() => router.navigate({ to: "/settings" })}>
            Settings
            </button>
        </li>
        <li>
            <button>My account</button>
        </li>
        <li>
            <button onClick={() => router.navigate({ to: "/contact" })}>
            Help
            </button>
        </li>
        <li>
            <button onClick={() => router.navigate({ to: "/contact" })}>
            Contact
            </button>
        </li>
        <li>
            <button onClick={handleSignOut}>Sign out</button>
        </li>
        </ul>
    </div>
    </div>
    <div className="navbar-end">
    <img
        src={logo}
        alt="Logo"
        className="h-8 w-8 object-contain"
    />
    </div>
</div>
);
};

export default HamburguerMenu;
