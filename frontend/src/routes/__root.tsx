import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navbar } from "../components/navbar/navbar";
import HamburguerMenu from "../components/hamburguerMenu/hamburguerMenu";

export const Route = createRootRoute({
  component: () => (
    <>
      <SignedOut>
        <Navbar />
      </SignedOut>

      <SignedIn>
        <HamburguerMenu />
      </SignedIn>

      <Outlet />

      <TanStackRouterDevtools />
    </>
  ),
});


