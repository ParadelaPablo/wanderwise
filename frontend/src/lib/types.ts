export type Day = {
  order: number;
  date: Date;
  stops: Stop[];
};

export interface Stop {
  type: string;
  name: string;
}

export interface TripPostRequest {
  userId: string;
  title: string;
  days: Day[];
}
