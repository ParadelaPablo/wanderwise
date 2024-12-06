export enum StopType {
  FIKA = "FIKA",
  ACTIVITY = "ACTIVITY",
  FUEL = "FUEL",
  FOOD_AND_DRINK = "FOOD_AND_DRINK",
  SIGHTSEEING = "SIGHTSEEING",
  REST = "REST",
  OVERNIGHT = "OVERNIGHT",
}

type Day = {
  dayOrder: number;
  date: Date;
  stops: Stop[];
};

interface Stop {
  stopType: StopType;
  name: string;
}
interface Trip {
  userId: string;
  title: string;
  days: Day[];
}

interface TripRequest {
  userId: string;
  title: string;
}

export interface FullTripRequest {
  userId: string | null | undefined;
  title: string;
  days: Day[];
}

export type { Day, Stop, TripRequest, Trip };

export type SpotifyTrack = {
  data: {
    id: string;
    name: string;
    albumOfTrack: {
      coverArt: {
        sources: { url: string }[];
      };
    };
    artists: {
      items: {
        profile: { name: string };
      }[];
    };
    duration: {
      totalMilliseconds: string;
    };
  };
};

export type StopResponse = {
  id: number | null;
  dayId: number | null;
  stopType: StopType;
  name: string | null;
  createdAt: string | null;
  updatedAt: string | null;
};

export type DayResponse = {
  id: number | null;
  tripId: number | null;
  dayOrder: number | null;
  date: string | number | Date;
  stops: StopResponse[];
  createdAt: string | null;
  updatedAt: string | null;
};

export type TripData = {
  id: number;
  userId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  days: DayResponse[];
};

export interface TripForGallery {
  id: string;
  title: string;
}

export interface Highlight {
  id: number;
  text: string;
  title: string;
  imageUrl?: string;
  songUrl?: string;
  songArtist?: string;
  songCoverUrl?: string;
  songTitle?: string;
  date?: string;
}

export interface HighlightToPost {
  tripId: string;
  text: string;
  title: string;
  date?: string;
  songTitle?: string;
  artist?: string;
  songUrl?: string;
  songCoverUrl?: string;
  image: File;
}
