import { createRootRoute, Outlet } from "@tanstack/react-router";
import { SignedIn, SignedOut} from "@clerk/clerk-react";
import { Navbar } from "../components/navbar/navbar";
import HamburguerMenu from "../components/hamburguerMenu/hamburguerMenu";


export const Route = createRootRoute({
  component: () => (
    <div className="h-screen">
      <SignedOut>
        <Navbar />
      </SignedOut>
      <SignedIn>
        <HamburguerMenu />
      </SignedIn>
      <Outlet />
    </div>
  ),
});
