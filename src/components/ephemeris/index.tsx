import React from "react";
import { Day, Moment } from "../../types";
import { PeriodLighting } from "../period-lighting";
import { DAY_DURATION } from "../../constants";

interface Props {
  data: Day[];
  lightsOnTime: Moment;
  lightsOffTime: Moment;
}

const NATURAL_AREAS: { from: Moment; to: Moment; color: string }[] = [
  { from: "civrise", to: "sunrise", color: "lightblue" },
  { from: "sunrise", to: "sunset", color: "lightyellow" },
  { from: "sunset", to: "civset", color: "lightblue" }
];

export const Ephemeris = ({ data, lightsOnTime, lightsOffTime }: Props) => {
  const areasWithLighting = [
    { from: 0, to: DAY_DURATION, color: "midnightblue" },
    { from: lightsOnTime, to: "sunrise" as Moment, color: "yellow" },
    { from: "sunset" as Moment, to: lightsOffTime, color: "yellow" },
    ...NATURAL_AREAS
  ];

  return <PeriodLighting data={data} areas={areasWithLighting} />;
};
