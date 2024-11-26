import { createFileRoute } from "@tanstack/react-router";
import { Drawer } from "../../../components/drawer/drawer";
import { Map } from "../../../components/map/map";
import { ReactNode, useState } from "react";
import { getMapData } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/create/")({
  component: RouteComponent,
});

type Day = {
  id: number;
  date: Date;
  stops: Stop[];
};

interface Stop {
  type: string;
  name: string;
  icon: ReactNode;
}

function RouteComponent() {
  const [days, setDays] = useState<Day[]>([
    { id: 1, date: new Date(), stops: [] },
  ]);

  const [totalTravelTime, setTotalTravelTime] = useState<string>("");

  const mapData = getMapData(days);
  return (
    <div className="h-full w-full flex flex-col  justify-between">
      <div className="p-2">
        <Map
          geoLocation={{ lat: 59.3467183, lng: 18.0097756 }}
          isFullScreen={false}
          origin={mapData.origin}
          destination={mapData.destination}
          waypoints={mapData.waypoints}
          setTotalTravelTime={setTotalTravelTime}
        />
      </div>
      <div className="absolute bottom-0 m-auto left-0 right-0">
        <Drawer
          days={days}
          setDays={setDays}
          totalTravelTime={totalTravelTime}
        />
      </div>
    </div>
  );
}
