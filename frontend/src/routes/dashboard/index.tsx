import { createFileRoute, useNavigate } from "@tanstack/react-router";
import TripGallery from "../../components/dashboard/tripGallery";
import { useAuth, useUser } from "@clerk/clerk-react";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useUser();
  const navigate = useNavigate();


  return (
    <div className="h-full">
      <TripGallery />
    </div>
  );
}

export default RouteComponent;
