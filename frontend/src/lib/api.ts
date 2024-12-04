import axios from "axios";
import { TripForGallery, FullTripRequest } from "./types";

const BASE_URL = import.meta.env.VITE_BASE_BACKEND_URL + "/trips";

export const getTrips = async (): Promise<TripForGallery[]> => {
    //throw new Error("Not implemented yet");
    const response = await axios.get(BASE_URL);
    return response.data;
};

export const deleteTripById = async (id: number): Promise<TripForGallery> => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Axios error details:", error.response?.data);
        } else {
            console.error("Unexpected error:", error);
        }
        throw error;
    }
};

export async function createFullTrip(fullTrip: FullTripRequest) {
    if (fullTrip.userId == null || fullTrip.userId == undefined) {
        throw new Error("User Id is undefined");
    }

    const updatedFullTrip = {
        ...fullTrip,
        days: fullTrip.days.map((day) => ({
            ...day,
            date: new Date(day.date).toISOString(),
        })),
    };
    console.log(updatedFullTrip);
    const response = await fetch(`${BASE_URL}/full-trip`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFullTrip),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
            errorData.message ||
                `Oops! Our system is taking a little nap, ${response.statusText}`
        );
    }
    const json = await response.json();
    return json;
}

export async function getTripById(tripId: number) {
    const response = await fetch(`${BASE_URL}/${tripId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
            errorData.message ||
                `Oops! Our system is taking a little nap, ${response.statusText}`
        );
    }
    const json = await response.json();
    return json;
}

export async function deleteHighlight(highlightId: number): Promise<boolean> {
    const response = await fetch(`${BASE_URL}/highlights/${highlightId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
            errorData.message ||
                `Oops! Our system is taking a little nap, ${response.statusText}`
        );
    }
    return true;
}
