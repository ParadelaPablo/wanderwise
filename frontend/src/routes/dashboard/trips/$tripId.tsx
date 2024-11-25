import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/trips/$tripId")({
  component: RouteComponent,
});

function RouteComponent() {
  const tripId = useParams({
    from: "/dashboard/trips/$tripId",
    select: (params) => params.tripId,
  });
  return (<div>
    {tripId}
  </div>)
}
