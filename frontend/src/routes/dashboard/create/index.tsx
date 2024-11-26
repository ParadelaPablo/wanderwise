import { createFileRoute } from "@tanstack/react-router";
import { Drawer } from "../../../components/drawer/drawer";
import { Map } from "../../../components/map/map";
export const Route = createFileRoute("/dashboard/create/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-full w-full flex flex-col gap-2 justify-between">
      <div>
        <Map
          geoLocation={{ lat: 59.3467183, lng: 18.0097756 }}
          isFullScreen={false}
        />
      </div>
      <div>
        <Drawer />
      </div>
    </div>
  );
}
