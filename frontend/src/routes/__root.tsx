import { createRootRoute, Outlet } from "@tanstack/react-router";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-react";
import { Navbar } from "../components/navbar/navbar";
import HamburguerMenu from "../components/hamburguerMenu/hamburguerMenu";
import HomeBeforeLogin from "@/components/homeBeforeLogin/homeBeforeLogIn";


export const Route = createRootRoute({
  component: () => (
    <div className="h-screen">
      <SignedOut>
        <Navbar />
        <HomeBeforeLogin />
      </SignedOut>
      <SignedIn>
        <HamburguerMenu />
      </SignedIn>
      <Outlet />
    </div>
  ),
});
