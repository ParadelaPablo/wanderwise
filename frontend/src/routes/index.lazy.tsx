import { createLazyFileRoute } from "@tanstack/react-router";
import HomeBeforeLogin from "../components/homeBeforeLogin/homeBeforeLogIn";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="w-full h-screen">

      <HomeBeforeLogin />
    </div>
  );
}
