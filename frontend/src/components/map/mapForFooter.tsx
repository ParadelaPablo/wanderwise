import { DirectionsRenderer, GoogleMap } from "@react-google-maps/api";
import { useCallback, useEffect, useMemo, useState } from "react";
import TripTimeline from "./TripTimeline";
import { TripData } from "@/lib/types";
import { getIcon } from "@/lib/utils";

const containerStyle = {
  width: "390px",
  height: "390px",
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

  useEffect(() => {
    if (directionsResponse && map) {
      const { routes } = directionsResponse;
      const { legs } = routes[0];

      // add the start point custom marker  for the start location
      new google.maps.Marker({
        position: legs[0].start_location,
        map: map,
        icon: {
          url: "../../../public/icons/startpoint.png",
          scaledSize: new google.maps.Size(30, 30),
        },
        title: "Start Location",
      });

      // Add the custom marker with the final destination
      new google.maps.Marker({
        position: legs[legs.length - 1].end_location,
        map: map,
        icon: {
          url: "../../../public/icons/destination.png",
          scaledSize: new google.maps.Size(30, 30),
        },
        title: "Destination",
      });

      //get oll the cities that are left
      const cities = [];
      // Add the end address of the first leg
      cities.push(legs[0].end_address);
      // Add the start address of the last leg
      cities.push(legs[legs.length - 1].start_address);

      // Add intermediate cities excluding the first and the last leg

      for (let i = 1; i < legs.length - 1; i++) {
        cities.push(legs[i].end_address); //add only the end address becuse the start address is already exists in the array
      }

      //maybe uniq is not a good choise because user might have same city more tham one time
      //  const uniq = [...new Set(cities)];
      //  console.log("Cities:   " + cities)

      cities.forEach((city, index) => {
        // Find the corresponding stop in tripData
        tripData?.days?.forEach((day) => {
          day.stops?.forEach((stop) => {
            if (stop.name === city) {
              const stopType = stop.stopType;

              // Add the custom marker with the final destination
              new google.maps.Marker({
                position: legs[index].end_location,
                map: map,
                icon: {
                  url: getIcon(stopType),
                  scaledSize: new google.maps.Size(30, 30),
                },
                title: `Stop: ${stop.name}`,
              });
            }
          });
        });
      });
    }
  }, [directionsResponse, map, tripData]);

  return (
    <div className="w-full flex flex-col lg:flex-row gap-4 justify-center items-center mb-20">
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
                visible: false,
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
