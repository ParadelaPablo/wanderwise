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
      return <FaCoffee className="text-lg text-primary" />;
    case StopType.ACTIVITY:
      return <FaMapMarkerAlt className="text-lg text-primary" />;
    case StopType.FUEL:
      return <FaGasPump className="text-lg text-primary" />;
    case StopType.FOOD_AND_DRINK:
      return <FaUtensils className="text-lg text-primary" />;
    case StopType.SIGHTSEEING:
      return <FaCamera className="text-lg text-primary" />;
    case StopType.REST:
      return <FaMoon className="text-lg text-primary" />;
    case StopType.OVERNIGHT:
      return <FaBed className="text-lg text-primary" />;
    default:
      return null;
  }
}
