import { createFileRoute, useParams } from "@tanstack/react-router";
import Footer from "../../../components/footer/footer";
import Todo from "../../../components/todo/todo";
import ToPack from "../../../components/topack/topack";
import { useState } from "react";

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
    <div className="h-screen flex flex-col justify-between">
      <div>My trip N {tripId}</div>

      <div>
        {visibleComponent === "Todo" && <Todo />}
        {visibleComponent === "ToPack" && <ToPack />}
      </div>
      <Footer setVisibleComponent={setVisibleComponent}
        />
    </div>
  );
}
