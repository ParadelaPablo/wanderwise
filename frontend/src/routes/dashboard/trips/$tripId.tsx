import { createFileRoute, useParams } from "@tanstack/react-router";
import Footer from "../../../components/footer/footer";
import { Highlights } from "@/components/highlights/highlights";

export const Route = createFileRoute("/dashboard/trips/$tripId")({
  component: RouteComponent,
});

function RouteComponent() {
  const tripId = useParams({
    from: "/dashboard/trips/$tripId",
    select: (params) => params.tripId,
  });
  return (
    <div className="h-screen flex flex-col justify-between">
      <div>My trip N {tripId}</div>
      <Highlights/>
      <Footer />
    </div>
  );
}
