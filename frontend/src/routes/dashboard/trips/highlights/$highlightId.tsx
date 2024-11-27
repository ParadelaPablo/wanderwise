import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/dashboard/trips/highlights/$highlightId"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const highlightId = useParams({
    from: "/dashboard/trips/highlights/$highlightId",
    select: (params) => params.highlightId,
  });
  return (
    <div>
      <div className="btn">Back</div>
      <p>My note {highlightId}</p>
    </div>
  );
}
