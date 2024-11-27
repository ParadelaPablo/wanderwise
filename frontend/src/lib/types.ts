export type Day = {
    id: number;
    date: Date;
    stops: Stop[];
  };
  
export interface Stop {
    type: string;
    name: string;
  }