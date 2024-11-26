import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getMapData(days) {
  if (!days.length || !days[0].stops.length) {
    return {
      origin: "",
      destination: "",
      waypoints: [],
    };
  }

 
  const origin = days[0].stops[0]?.name || "";

 
  const lastDay = days[days.length - 1];
  const destination =
    lastDay.stops[lastDay.stops.length - 1]?.name || "";


  const waypoints = days.flatMap((day, dayIndex) =>
    day.stops
      .filter((stop, stopIndex) =>
        !(dayIndex === 0 && stopIndex === 0) && 
        !(dayIndex === days.length - 1 && stopIndex === day.stops.length - 1) // Exclude destination
      )
      .map((stop) => ({
        location: stop.name,
        stopover: true,
      }))
  );

  return {
    origin,
    destination,
    waypoints,
  };
}
