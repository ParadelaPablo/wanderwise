import { SignedIn, UserButton } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";

const routes = [
  { to: "/", label: "Home", className: "btn btn-ghost text-xl" },
  { to: "/signin", label: "Sign In", className: "btn btn-ghost text-xl" },
];

export const Navbar = () => {
  return (
    <div className="p-2 flex gap-2 justify-between items-center">
      {routes.map((route) => (
        <Link key={route.to} to={route.to} className={`${route.className} [&.active]:text-amber-300`}>
          {route.label}
        </Link>
      ))}
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};
