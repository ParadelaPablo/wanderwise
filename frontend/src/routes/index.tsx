import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import HomeBeforeLogin from "../components/homeBeforeLogin/homeBeforeLogIn";
import { useAuth } from "@clerk/clerk-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  if (isSignedIn) {
    navigate({ to: `/dashboard` });
  }

  return (
    <div className="w-full h-screen">
      <HomeBeforeLogin />
    </div>
  );
}
