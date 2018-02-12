export interface Duration {
  h: string;
  m: string;
}

export interface Trip {
  arrival: string;
  cost: number;
  departure: string;
  discount: number;
  duration: Duration;
  reference: string;
  transport: string;
}
