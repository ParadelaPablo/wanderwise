import { DirectionsRenderer, GoogleMap } from "@react-google-maps/api";
import { useCallback, useEffect, useMemo, useState } from "react";
import TripTimeline from "./TripTimeline";
import { TripData } from "@/lib/types";
import { getIcon } from "@/lib/utils";


const containerStyle = {
  margin: "auto",
  width: "100%",
  height: "100%"
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

      // check if there's more than one leg to avoid accessing undefined
      if (legs.length > 0) {
        
        // Add the start point custom marker for the start location
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

        // Get all the cities that are left (excluding the start and end location)
        const cities = [];
        // Add the end address of the first leg
        cities.push(legs[0].end_address);

        // Only add the last leg's start address if there are more than one leg
        if (legs.length > 1) {
          cities.push(legs[legs.length - 1].start_address);
        }

        // Add intermediate cities (if there are any)
        for (let i = 1; i < legs.length - 1; i++) {
          cities.push(legs[i].end_address);
        }

        cities.forEach((city, index) => {
          // Find the corresponding stop in tripData
          tripData?.days?.forEach((day) => {
            day.stops?.forEach((stop) => {
              if (stop.name === city) {
                const stopType = stop.stopType;

                // Add the custom marker with the stop's corresponding position
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
    }
  }, [directionsResponse, map, tripData]);

  return (
    <div className="w-full flex flex-col lg:flex-row gap-4 justify-center items-center mb-20">
      <div className="h-96 w-96 lg:h-[700px] lg:w-[700px]">
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
      </div>

      <div className="mx-2">
        <TripTimeline tripData={tripData!} />
      </div>
    </div>
  );
};
