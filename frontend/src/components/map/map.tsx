import React, { useCallback, useMemo, useState } from "react";
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { secondsToTimeString } from "@/lib/utils";

type MapProps = {
  geoLocation: {
    lat: number;
    lng: number;
  };
  isFullScreen: boolean;
  origin: string;
  destination: string;
  waypoints: Array<{ location: string; stopover: boolean }>;
  setTotalTravelTime: React.Dispatch<React.SetStateAction<string>>;
};

function Map({
  geoLocation,
  isFullScreen,
  origin,
  destination,
  waypoints,
  setTotalTravelTime,
}: MapProps) {
  const containerStyle = {
    width: "100%",
    height: isFullScreen ? "100vh" : "90vh",
  };

  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);

  const handleDirectionsCallback = useCallback(
    (
      response: google.maps.DirectionsResult,
      status: google.maps.DirectionsStatus
    ) => {
      if (status === "NOT_FOUND") {
        return;
      }
      if (status === "OK") {
        setDirectionsResponse(response);

        const legs = response.routes[0].legs;
        const totalDurationSeconds = legs.reduce(
          (sum: number, leg: google.maps.DirectionsLeg) =>
            sum + (leg.duration?.value || 0),
          0
        );
        const totalDurationText = secondsToTimeString(totalDurationSeconds);
        setTotalTravelTime((prev) =>
          prev !== totalDurationText ? totalDurationText : prev
        );
      } else {
        console.error(`Error fetching directions: ${status}`);
      }
    },
    [setTotalTravelTime]
  );

  const directionsOptions = useMemo(() => {
    return {
      origin: origin,
      destination: destination,
      travelMode: "DRIVING",
      waypoints: waypoints,
    };
  }, [origin, destination, waypoints]);

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={geoLocation}
        zoom={6}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        <DirectionsService
          options={directionsOptions}
          callback={handleDirectionsCallback}
        />
        {/* DirectionsRenderer displays the route */}
        {directionsResponse && (
          <DirectionsRenderer
            options={{
              directions: directionsResponse,
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
}

export { Map };
