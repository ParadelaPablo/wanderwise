import { createFileRoute } from "@tanstack/react-router";
import { Drawer } from "../../../components/drawer/drawer";
import { Map } from "../../../components/map/map";
import { useMemo, useState } from "react";
import { getMapData } from "@/lib/utils";
import { Day } from "@/lib/types";

export const Route = createFileRoute("/dashboard/create/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [days, setDays] = useState<Day[]>([
    { dayOrder: 1, date: new Date(), stops: [] },
  ]);

  const [totalTravelTime, setTotalTravelTime] = useState<string>("");

  const mapData = useMemo(() => getMapData(days), [days]);
  const geoLocationMemo = useMemo(
    () => ({ lat: 59.3467183, lng: 18.0097756 }),
    []
  );
  const originMemo = useMemo(() => mapData?.origin || "", [mapData]);
  const destinationMemo = useMemo(() => mapData?.destination || "", [mapData]);
  const waypointsMemo = useMemo(() => mapData?.waypoints || [], [mapData]);

  return (
    <div className="h-full w-full flex flex-col  justify-between">
      <div className="p-2">
        <Map
          geoLocation={geoLocationMemo}
          isFullScreen={false}
          origin={originMemo}
          destination={destinationMemo}
          waypoints={waypointsMemo}
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
