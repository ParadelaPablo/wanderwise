import { createFileRoute, useParams } from "@tanstack/react-router";
import Footer from "../../../components/footer/footer";
import Todo from "../../../components/todo/todo";
import ToPack from "../../../components/topack/topack";
import { useState } from "react";
import Highlights from "../../../components/highlights/highlights";

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
      <div>My trip N {tripId}</div>
      <div className="flex justify-left items-start flex-grow my-8 border p-1" >
        {visibleComponent === "Todo" && <Todo />}
        {visibleComponent === "ToPack" && <ToPack />}
        {visibleComponent === "Highlights" && <Highlights />}
      </div>
      <Footer setVisibleComponent={setVisibleComponent} />
    </div>
  );
}
