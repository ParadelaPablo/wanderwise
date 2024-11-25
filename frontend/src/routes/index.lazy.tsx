import { createLazyFileRoute } from "@tanstack/react-router";
import HomeBeforeLogIn from "../components/homeBeforeLogIn";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="w-full h-screen">
      <HomeBeforeLogIn />
    </div>
  );
}
