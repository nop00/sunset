import React from "react";
import { Day, Moment } from "../../types";
import { PeriodLighting } from "../period-lighting";
import { DAY_DURATION, MIDDAY_DURATION, Colors } from "../../constants";

interface Props {
  data: Day[];
  lightsOnTime: Moment;
  lightsOffTime: Moment;
}

const NATURAL_AREAS: { from: Moment; to: Moment; color: Colors }[] = [
  { from: "civrise", to: "sunrise", color: Colors.Twilight },
  { from: "sunrise", to: "sunset", color: Colors.Sunlight },
  { from: "sunset", to: "civset", color: Colors.Twilight }
];

export const Ephemeris = ({ data, lightsOnTime, lightsOffTime }: Props) => {
  const areasWithLighting: { from: Moment | number, to: Moment | number, color: Colors }[] = [
    { from: 0, to: DAY_DURATION, color: Colors.Night },
  ];

  if (lightsOffTime < lightsOnTime) {
    areasWithLighting.push(
        { from: 0, to: lightsOffTime, color: Colors.Lighting },
        { from: lightsOnTime, to: DAY_DURATION, color: Colors.Lighting },
    );
  } else {
    areasWithLighting.push(
        { from: MIDDAY_DURATION, to: lightsOffTime, color: Colors.Lighting },
        { from: lightsOnTime, to: MIDDAY_DURATION, color: Colors.Lighting },
    );
  }

  areasWithLighting.push(...NATURAL_AREAS);

  return <PeriodLighting data={data} areas={areasWithLighting} />;
};
