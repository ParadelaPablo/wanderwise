import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Day } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMapData(days: Day[]) {
  if (!days.length || !days[0]?.stops?.length) {
    return {
      origin: "",
      destination: "",
      waypoints: [],
    };
  }

  const origin = days[0].stops[0]?.name || "";

  const lastDay = days[days.length - 1];
  const destination = lastDay?.stops?.[lastDay.stops.length - 1]?.name || "";

  const waypoints = days.flatMap((day, dayIndex) =>
    day.stops
      .filter(
        (_, stopIndex) =>
          !(dayIndex === 0 && stopIndex === 0) &&
          !(dayIndex === days.length - 1 && stopIndex === day.stops.length - 1) 
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
