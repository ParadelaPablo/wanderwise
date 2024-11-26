import { createFileRoute } from "@tanstack/react-router";
import Gallery from "../../components/gallery/gallery";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Gallery />
    </div>
  );
}
