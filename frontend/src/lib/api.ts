import axios from "axios";
import {
  TripForGallery,
  FullTripRequest,
  Highlight,
  HighlightToPost,
} from "./types";

const BASE_URL = import.meta.env.VITE_BASE_BACKEND_URL + "/api/trips";
const BACKEND_GET_HIGHLIGHT = "http://localhost:8080/api/highlights/trip/";

const BACKEND_DEV_URL = "http://localhost:8080/api/highlights/new";

export const getTripsForUser = async (
  userId: string
): Promise<TripForGallery[]> => {
  if (!userId) {
    throw Error("User is not defined");
  }
  const response = await axios.get(`${BASE_URL}/user/${userId}`);
  const data = response.data;
  console.log(data);
  return data;
};

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

/**
 * Delete the highlight with the given id
 * @param highlightId number : of the highlight to delete
 * @returns boolean : true if the highlight was deleted successfully
 */
export async function deleteHighlight(highlightId: number): Promise<boolean> {
  const response = await fetch(
    `http://localhost:8080/api/highlights/${highlightId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message ||
        `Oops! Our system is taking a little nap, ${response.statusText}`
    );
  }
  return true;
}

export const fetchHighlights = async (tripId: number): Promise<Highlight[]> => {

  const response = await axios.get(BACKEND_GET_HIGHLIGHT + tripId);
  return response.data;
};


const convertToBase64 = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string); // On success, resolve with base64 string
    reader.onerror = reject; // Reject on error
    reader.readAsDataURL(file); // Read the file as base64
  });
};

export const postHighLight = async (highlight: HighlightToPost) => {
  console.log("mutating with:", highlight.tripId);
  if (!highlight) throw new Error("Highlight data is missing");
  if (highlight.image) {
    const base64Image = await convertToBase64(highlight.image);
    const base64Data = base64Image.split(",")[1];
    highlight.image = base64Data;
  }
  const response = await fetch(BACKEND_DEV_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(highlight),
  });
  if (!response.ok) {
    throw new Error("Failed to save highlight");
  }
  //just because on the backend i send a response without a body (such as a 204 No Content status),i cant to parse it as JSON.
  let data = {};
  if (response.status !== 204) {  
    const responseText = await response.text();  
    try {
      data = responseText ? JSON.parse(responseText) : {}; 
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }

  console.log("json", data);  
  
};
