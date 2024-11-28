import { getTripById } from "@/lib/api";
import { GoogleMap } from "@react-google-maps/api";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import TripTimeline from "./TripTimeline";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: 59.3467183,
  lng: 18.0097756,
};
export const MapForFooter = ({ tripId }: { tripId: number }) => {
  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["trip", tripId],
    queryFn: () => getTripById(tripId),
    enabled: !!tripId,
  });
  if (data) {
    console.log("Here is the response", data);
  }
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={7}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
      {isLoading && <div>Loading...</div>}
      {isError && <div> {error.message}</div>}
      <TripTimeline tripData={data} />
    </div>
  );
};
