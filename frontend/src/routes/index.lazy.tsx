import { createLazyFileRoute } from "@tanstack/react-router";
import HomeBeforeLogIn from "../components/homeBeforeLogIn";
import { Map } from "../components/map/map";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="w-full h-screen">
      {/** <HomeBeforeLogIn /> */}
      <Map
        geoLocation={{ lat: 57.7089, lng: 11.9746 }}
        isFullScreen={true}
        origin="Gothenburg"
        destination="Stockholm"
      />
    </div>
  );
}
