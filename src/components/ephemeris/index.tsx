import React, { useState, useRef } from "react";
import { x } from "@xstyled/styled-components";
import { Day, Moment } from "../../types";
import PeriodLighting from "../period-lighting";

interface Props {
  data: Day[];
  lightsOnTime: Moment;
  lightsOffTime: Moment;
}

const DAY_DURATION = 24 * 60 * 60;

const NATURAL_AREAS: { from: Moment; to: Moment; color: string }[] = [
  { from: "civrise", to: "sunrise", color: "lightblue" },
  { from: "sunrise", to: "sunset", color: "lightyellow" },
  { from: "sunset", to: "civset", color: "lightblue" }
];

const Ephemeris = ({ data, lightsOnTime, lightsOffTime }: Props) => {
  const [xPos, setXPos] = useState(0);
  const overlay = useRef(undefined);

  const handleMouseMove = (e: { screenX: React.SetStateAction<number> }) =>
    overlay && setXPos(e.screenX - overlay.current.getBoundingClientRect().x);

  const areasWithLighting = [
    { from: 0, to: DAY_DURATION, color: "midnightblue" },
    { from: 0, to: lightsOnTime, color: "yellow" },
    { from: lightsOffTime, to: DAY_DURATION, color: "yellow" },
    ...NATURAL_AREAS
  ];

  return (
    <x.div h="100%" position="relative">
      <PeriodLighting data={data} areas={areasWithLighting} />
      <x.div
        ref={overlay}
        position="absolute"
        top={0}
        left={0}
        bottom={0}
        right={0}
        onMouseMove={handleMouseMove}
      >
        <x.div
          position="absolute"
          style={{ left: xPos }}
          top={0}
          bottom={0}
          border="1px dashed red"
        />
      </x.div>
    </x.div>
  );
};

export default Ephemeris;
