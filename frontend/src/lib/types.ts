enum StopType {
    FIKA = "FIKA",
    ACTIVITY = "ACTIVITY",
    FUEL = "FUEL",
    FOOD_AND_DRINK = "FOOD_AND_DRINK",
    SIGHTSEEING = "SIGHTSEEING",
    REST = "REST",
    OVERNIGHT = "OVERNIGHT",
}

type Day = {
    order: number;
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

export { StopType };
export type { Day, Stop, TripRequest, Trip };
