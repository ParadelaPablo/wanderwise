import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";

export const Navbar = () => {
  return (
    <div className="p-2 flex gap-2 justify-between items-center">
      <Link to="/" className="btn btn-ghost text-xl [&.active]:text-amber-300">
        Home
      </Link>{" "}
      <SignedOut>
        <Link
          className="btn btn-ghost text-xl [&.active]:text-amber-300"
          to="/signin"
        >
          Sign In
        </Link>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};
