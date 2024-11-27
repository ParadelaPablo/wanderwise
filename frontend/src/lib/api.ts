type StopType = "START" | "INTERMEDIATE" | "END"; // Example StopType enum

interface Stop {
    stopType: StopType;
    name: string;
}

type Day = {
    id?: number; // Optional because it will be assigned by the backend
    date: Date; // Use `Date` for JavaScript date objects
    stops: Stop[];
};

interface Trip {
    userId: string;
    title: string;
    days: Day[];
}

const BASE_DEV_URL = "http://localhost:8080/api/trips";

/**
 * Creates a trip, its associated days, and their stops.
 * @param trip Trip object containing days and stops
 * @returns The created trip object with its associated details
 */
async function createTripWithDaysAndStops(trip: Trip): Promise<Trip> {
    try {
        // Step 1: Create the Trip
        const tripResponse = await createTrip({
            userId: trip.userId,
            title: trip.title,
        });

        // Step 2: Create Days for the Trip
        for (let i = 0; i < trip.days.length; i++) {
            const day: Day = trip.days[i];

            // Convert `Date` object to ISO string for API request
            const dayResponse = await createDay({
                tripId: tripResponse.id,
                date: day.date.toISOString(),
                dayOrder: i + 1, // Use 1-based indexing for dayOrder
            });

            // Step 3: Create Stops for the Day
            for (let j = 0; j < day.stops.length; j++) {
                const stop: Stop = day.stops[j];

                // Create each Stop
                await createStop({
                    tripId: tripResponse.id,
                    dayId: dayResponse.id,
                    stopType: stop.stopType,
                    name: stop.name,
                });
            }
        }

        return tripResponse; // Return the created trip details
    } catch (error) {
        console.error("Error creating trip with days and stops:", error);
        throw error;
    }
}

/**
 * Create a Trip.
 * @param tripRequest Object containing userId and title
 * @returns The created Trip object
 */
async function createTrip(tripRequest: {
    userId: string;
    title: string;
}): Promise<Trip> {
    const response = await fetch(`${BASE_DEV_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tripRequest),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
            errorData.message || `Failed to create trip: ${response.statusText}`
        );
    }

    return await response.json(); // Return the full Trip object
}

/**
 * Create a Day for a specific Trip.
 * @param dayRequest Object containing tripId, date, and dayOrder
 * @returns The created Day object
 */
async function createDay(dayRequest: {
    tripId: string;
    date: string;
    dayOrder: number;
}): Promise<Day> {
    const endpoint = `${BASE_DEV_URL}/${dayRequest.tripId}/days`;
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dayRequest),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
            errorData.message || `Failed to create day: ${response.statusText}`
        );
    }

    return await response.json(); // Return the full Day object
}

/**
 * Create a Stop for a specific Day.
 * @param stopRequest Object containing tripId, dayId, stopType, and name
 * @returns The created Stop object
 */
async function createStop(stopRequest: {
    tripId: string;
    dayId: number;
    stopType: StopType;
    name: string;
}): Promise<Stop> {
    const endpoint = `${BASE_DEV_URL}/${stopRequest.tripId}/days/${stopRequest.dayId}/stops`;
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(stopRequest),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
            errorData.message || `Failed to create stop: ${response.statusText}`
        );
    }

    return await response.json(); // Return the full Stop object
}

export { createTripWithDaysAndStops, createTrip, createDay, createStop };
