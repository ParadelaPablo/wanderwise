import { FullTripRequest } from "./types";

const BASE_DEV_URL = "http://localhost:8080/api/trips";

export async function createFullTrip(fullTrip: FullTripRequest) {
  if(fullTrip.userId == null || fullTrip.userId == undefined){
    throw new Error("User Id is undefined")
  }

  const updatedFullTrip = {
    ...fullTrip,
    days: fullTrip.days.map((day) => ({
      ...day,
      date: new Date(day.date).toISOString() 
    })),
  };

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
