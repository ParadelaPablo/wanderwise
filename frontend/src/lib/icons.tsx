import { StopType } from "@/lib/types";
import { ReactNode } from "react";
import {
  FaCoffee,
  FaMapMarkerAlt,
  FaGasPump,
  FaUtensils,
  FaCamera,
  FaBed,
  FaMoon,
} from "react-icons/fa";

/**
 * Function to get an icon based on StopType.
 * @param {StopType} stopType - The type of the stop.
 * @returns {ReactNode} - The corresponding icon as a ReactNode.
 */
export function getStopTypeIcon(stopType: StopType): ReactNode {
  switch (stopType) {
    case StopType.FIKA:
      return <FaCoffee className="text-lg text-primary" />; // Coffee icon for FIKA
    case StopType.ACTIVITY:
      return <FaMapMarkerAlt className="text-lg text-primary" />; // Map marker icon for ACTIVITY
    case StopType.FUEL:
      return <FaGasPump className="text-lg text-primary" />; // Gas pump icon for FUEL
    case StopType.FOOD_AND_DRINK:
      return <FaUtensils className="text-lg text-primary" />; // Utensils icon for FOOD_AND_DRINK
    case StopType.SIGHTSEEING:
      return <FaCamera className="text-lg text-primary" />; // Camera icon for SIGHTSEEING
    case StopType.REST:
      return <FaMoon className="text-lg text-primary" />; // Moon icon for REST
    case StopType.OVERNIGHT:
      return <FaBed className="text-lg text-primary" />; // Bed icon for OVERNIGHT
    default:
      return null; // Fallback if the stop type is not recognized
  }
}
