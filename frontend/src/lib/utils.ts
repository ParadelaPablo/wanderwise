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

export function millisToMinutesAndSeconds(millis: string) {
  const date = new Date(millis);
  return `${date.getMinutes()}:${date.getSeconds()}`;
}

export const secondsToTimeString = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${hours} hrs ${minutes} mins`;
};

export const getIcon = (stopType: string) => {
  switch (stopType) {
    case "FIKA":
      return "/icons/fika.png";
    case "ACTIVITY":
      return "/icons/activity.png";
    case "FUEL":
      return "/icons/fuel.png";
    case "FOOD_AND_DRINK":
      return "/icons/restaurant.png";
    case "SIGHTSEEING":
      return "icons/sightseeing.png";
    case "REST":
      return "/icons/rest.png";
    case "OVERNIGHT":
      return "/icons/overnight.png";
    default:
      return "/icons/red-dot.png";
  }
};
