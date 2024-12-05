import { createFileRoute, useNavigate } from "@tanstack/react-router";
import TripGallery from "../../components/dashboard/tripGallery";
import { useAuth } from "@clerk/clerk-react";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  if (!isSignedIn) {
    navigate({ to: "/signin" });
  }

  return (
    <div className="h-full">
      <TripGallery />
    </div>
  );
}

export default RouteComponent;
