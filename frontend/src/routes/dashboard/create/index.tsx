import { createFileRoute } from "@tanstack/react-router";
import { Drawer } from "../../../components/drawer/drawer";
export const Route = createFileRoute("/dashboard/create/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-screen flex flex-col justify-between">
      <div>Here is the map!</div>
      <div>
        <Drawer />
      </div>
    </div>
  );
}
