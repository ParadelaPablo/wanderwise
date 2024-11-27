type StopType = "START" | "INTERMEDIATE" | "END"; // Example StopType enum

interface Stop {
  stopType: StopType;
  name: string;
}

type Day = {
  order?: number; // Optional because it will be assigned by the backend
  date: Date; // Use `Date` for JavaScript date objects
  stops: Stop[];
};

interface Trip {
  userId: string;
  title: string;
  days: Day[];
}

interface FullTripRequest {
  userId: string;
  title: string;
  days: Day[];
}

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
  console.log("json", json);
  return json;
}
