export type Day = {
  id: number;
  date: Date;
  stops: Stop[];
};

export interface Stop {
  type: string;
  name: string;
}

export interface TripRequest {
  userId: string;
  title: string;
}
