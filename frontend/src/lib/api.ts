import axios from "axios";
import { FullTripRequest, TripForGallery } from "./types";

const BASE_DEV_URL = import.meta.env.VITE_BASE_DEV_URL;

export const getTrips = async (): Promise<TripForGallery[]> => {
  const response = await axios.get(BASE_DEV_URL);
  console.log(response.data);
  return response.data;
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
  const response = await fetch(`${BASE_DEV_URL}/full-trip`, {
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
  console.log("data have been sent!!! Here is the response", json);
  return json;
}

export async function getTripById(tripId: number) {
  const response = await fetch(`${BASE_DEV_URL}/${tripId}`, {
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
  console.log("Here is the response", json);
  return json;
}
