import { FullTripRequest } from "./types";

const BASE_DEV_URL = "http://localhost:8080/api/trips";

export async function createFullTrip(fullTrip: FullTripRequest) {
  const response = await fetch(`${BASE_DEV_URL}/full-trip`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fullTrip),
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
