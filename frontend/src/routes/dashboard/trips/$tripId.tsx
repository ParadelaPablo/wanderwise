import { createFileRoute, useParams } from "@tanstack/react-router";
import Footer from "../../../components/footer/footer";
import Todo from "../../../components/todo/todo";
import ToPack from "../../../components/topack/topack";
import { useState } from "react";
import Highlights from "../../../components/highlights/highlights";
import { MapForFooter } from "../../../components/map/mapForFooter";
export const Route = createFileRoute("/dashboard/trips/$tripId")({
  component: RouteComponent,
});
function RouteComponent() {
  const tripId = useParams({
    from: "/dashboard/trips/$tripId",
    select: (params) => params.tripId,
  });
  const [visibleComponent, setVisibleComponent] = useState("Todo");
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-grow mr-5 ml-5">
        <div>
          When we connect with backend we should put the name of the endpoint{" "}
          {tripId}
        </div>
        <div className="divider"></div>
        <div className="flex justify-left items-start my-2 p-1">
          {visibleComponent === "Map" && <MapForFooter tripId={Number(tripId)} />}
          {visibleComponent === "Todo" && <Todo tripId={tripId} />}
          {visibleComponent === "ToPack" && <ToPack />}
          {visibleComponent === "Highlights" && <Highlights />}
        </div>
      </div>
      <Footer setVisibleComponent={setVisibleComponent} />
    </div>
  );
}







