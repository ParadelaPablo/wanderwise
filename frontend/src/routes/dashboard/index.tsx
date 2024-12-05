import { createFileRoute, useNavigate } from "@tanstack/react-router";
import TripGallery from "../../components/dashboard/tripGallery";
import { useAuth, useUser } from "@clerk/clerk-react";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {


  return (
    <div className="h-full">
      <TripGallery />
    </div>
  );
}

export default RouteComponent;
