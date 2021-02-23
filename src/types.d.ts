export type Time = string;

export type Day = {
  date: string;
  astrise?: Time;
  nautrise?: Time;
  civrise: Time;
  sunrise: Time;
  transit?: Time;
  sunset: Time;
  civset: Time;
  nautset?: Time;
  astset?: Time;
  daylength?: Time;
};

export type Moment = keyof Day | number;
