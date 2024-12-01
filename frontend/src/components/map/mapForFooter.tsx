import { DirectionsRenderer, GoogleMap } from "@react-google-maps/api";
import { useCallback, useEffect, useMemo, useState } from "react";
import TripTimeline from "./TripTimeline";
import { TripData } from "@/lib/types";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: 59.3467183,
  lng: 18.0097756,
};
export const MapForFooter = ({
  tripData,
}: {
  tripId: number;
  tripData: TripData;
}) => {
  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  // prevent rendering, fingers crossed
  const waypoints = useMemo(() => {
    const result: google.maps.DirectionsWaypoint[] = [];
    tripData?.days?.forEach((day) => {
      day.stops?.forEach((stop) => {
        result.push({
          location: stop.name!,
          stopover: true,
        });
      });
    });
    return result;
  }, [tripData]);

  const origin = useMemo(() => waypoints[0]?.location || center, [waypoints]);
  const destination = useMemo(
    () => waypoints[waypoints.length - 1]?.location || center,
    [waypoints]
  );
  const intermediateWaypoints = useMemo(
    () => waypoints.slice(1, -1),
    [waypoints]
  );

  useEffect(() => {
    if (!origin || !destination || !waypoints.length || directionsResponse)
      return;

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: intermediateWaypoints,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirectionsResponse(result);
        } else {
          console.error("Error fetching directions:", status);
        }
      }
    );
  }, [
    origin,
    destination,
    intermediateWaypoints,
    directionsResponse,
    waypoints.length,
  ]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 justify-center items-center">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={7}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {directionsResponse && (
          <DirectionsRenderer
            options={{
              directions: directionsResponse,
              markerOptions: {
                icon: {
                  url: "../../../public/icons/pin.png",
                  scaledSize: new google.maps.Size(30, 30),
                },
                title: "new title",
                clickable: true,
              },
            }}
          />
        )}
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>

      <TripTimeline tripData={tripData!} />
    </div>
  );
};
