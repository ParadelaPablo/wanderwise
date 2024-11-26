import React, { useState } from "react";
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";

type MapProps = {
    geoLocation: {
        lat: number;
        lng: number;
    };
    isFullScreen: boolean;
    origin: string; // Starting location
    destination: string; // Destination location
    waypoints: string[],
    setTotalTravelTime: React.Dispatch<React.SetStateAction<string>>;
};

function Map({ geoLocation, isFullScreen, origin, destination, waypoints, setTotalTravelTime }: MapProps) {
    const containerStyle = {
        width: "100%",
        height: isFullScreen ? "100vh" : "90vh",
    };

    const [directionsResponse, setDirectionsResponse] = useState<any>(null);
   

    const handleDirectionsCallback = (response: any, status: string) => {
        if (status === "OK") {
            setDirectionsResponse(response);


            const legs = response.routes[0].legs; // Each leg corresponds to a segment (A->B, B->C)
            // const times = legs.map(
            //     (leg: any, index: number) =>
            //         `Leg ${index + 1}: ${leg.duration.text} (${leg.distance.text})`
            // );

            // Calculate total travel time
            const totalDurationSeconds = legs.reduce(
                (sum: number, leg: any) => sum + leg.duration.value,
                0
            );
            const totalDurationText = secondsToTimeString(totalDurationSeconds);
            setTotalTravelTime(totalDurationText);
        } else {
            console.error(`Error fetching directions: ${status}`);
        }
    };

    // Helper function to convert seconds into a readable time format (hours and minutes)
    const secondsToTimeString = (totalSeconds: number): string => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        return `${hours} hrs ${minutes} mins`;
    };

    return (
        <div>
            <LoadScript googleMapsApiKey="AIzaSyBfBneyoXPKgNKs7LOMurVbqmOYleIFvgk">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={geoLocation}
                    zoom={10}
                    options={{
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                    }}
                >
                    {/* DirectionsService fetches the route */}
                    <DirectionsService
                        options={{
                            origin: origin,
                            destination: destination,
                            travelMode: "DRIVING",
                            waypoints: waypoints,
                        }}
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
            </LoadScript>
        </div>
    );
}

export { Map };

