import React, { useState } from "react";
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
// Removed TravelMode import as it is not exported by "@react-google-maps/api"
type MapProps = {
    geoLocation: {
        lat: number;
        lng: number;
    };
    isFullScreen: boolean;
    origin: string; // Starting location
    destination: string; // Destination location
};

function Map({ geoLocation, isFullScreen, origin, destination }: MapProps) {
    const containerStyle = {
        width: "100%",
        height: isFullScreen ? "100vh" : "90vh",
    };

    const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
    const [travelTimes, setTravelTimes] = useState<string[]>([]);
    const [totalTravelTime, setTotalTravelTime] = useState<string>("");

    // Waypoints are intermediate stops between the origin and destination
    const waypoints = [
        {
            location: "Jönköping",
            stopover: true,
        },
        {
            location: "Norrköping",
            stopover: true,
        },
        {
            location: "Nyköping",
            stopover: true,
        },
        {
            location: "Västervik",
            stopover: true,
        },
        {
            location: "Kalmar",
            stopover: true,
        },
        {
            location: "Visby",
            stopover: true,
        }
    ];

    const handleDirectionsCallback = (result: google.maps.DirectionsResult | null, status: string) => {
        if (status === "OK" && result) {
            setDirectionsResponse(result);


            const legs = result.routes[0].legs; // Each leg corresponds to a segment (A->B, B->C)
            const times = legs.map(
                (leg: google.maps.DirectionsLeg, index: number) =>
                    `Leg ${index + 1}: ${leg.duration?.text} (${leg.distance?.text})`
            );

            // Calculate total travel time
            const totalDurationSeconds = legs.reduce(
                (sum: number, leg: google.maps.DirectionsLeg) => sum + (leg.duration?.value || 0),
                0
            );
            const totalDurationText = secondsToTimeString(totalDurationSeconds);

            setTravelTimes(times);
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
                            travelMode: google.maps.TravelMode.DRIVING,
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

            {/* Display Travel Times */}
            <div style={{ padding: "10px", fontSize: "14px" }}>
                <h3>Travel Times:</h3>
                <ul>
                    {travelTimes.map((time, index) => (
                        <li key={index}>{time}</li>
                    ))}
                </ul>
                <h4>Total Travel Time: {totalTravelTime}</h4>
            </div>
        </div>
    );
}

export { Map };

