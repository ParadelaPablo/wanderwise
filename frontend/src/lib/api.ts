import { TripPostRequest } from "./types";

const BASE_DEV_URL = "http://localhost:8080/api/trips";

export async function createTrip(tripRequest: TripPostRequest) {
console.log(tripRequest)
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
      errorData.message ||
        `Oops! Our system is taking break! ${response.statusText}`
    );
  }
  const json = await response.json();
  console.log(json);
  return json.id;
}
