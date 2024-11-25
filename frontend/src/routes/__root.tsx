import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
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
      <hr />
      <Outlet />

      <TanStackRouterDevtools />
    </>
  ),
});
