import React from "react";
import { Day, Moment } from "../../types";
import { PeriodLighting } from "../period-lighting";
import { DAY_DURATION, Colors } from "../../constants";

interface Props {
  data: Day[];
  lightsOnTime: Moment;
  lightsOffTime: Moment;
}

const NATURAL_AREAS: { from: Moment; to: Moment; color: string }[] = [
  { from: "civrise", to: "sunrise", color: Colors.Twilight },
  { from: "sunrise", to: "sunset", color: Colors.Sunlight },
  { from: "sunset", to: "civset", color: Colors.Twilight }
];

export const Ephemeris = ({ data, lightsOnTime, lightsOffTime }: Props) => {
  const areasWithLighting = [
    { from: 0, to: DAY_DURATION, color: Colors.Night },
    { from: lightsOnTime, to: "sunrise" as Moment, color: Colors.Lighting },
    { from: "sunset" as Moment, to: lightsOffTime, color: Colors.Lighting },
    ...NATURAL_AREAS
  ];

  return <PeriodLighting data={data} areas={areasWithLighting} />;
};
