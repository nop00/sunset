import React, { useState, useRef } from "react";
import { map, size, join } from "lodash";
import { timeToSeconds } from "../utils/time";
import { x } from "@xstyled/styled-components";

type Time = string;

type Day = {
  date: string;
  astrise: Time;
  nautrise: Time;
  civrise: Time;
  sunrise: Time;
  transit: Time;
  sunset: Time;
  civset: Time;
  nautset: Time;
  astset: Time;
  daylength: Time;
};

interface Props {
  data: Day[];
  lightsOnTime: number;
  lightsOffTime: number;
}

const TOTAL_HEIGHT = 24 * 60 * 60;

const Area = ({
  data,
  event,
  color = "grey",
  placement,
}: {
  data: Day[];
  event: keyof Day;
  color?: string;
  placement: "top" | "bottom";
}) => {
  const width = size(data);
  const path = join(
    map(data, (day, i) => i + "," + timeToSeconds(day[event])),
    " "
  );
  const baseY = placement === "top" ? 0 : TOTAL_HEIGHT;
  return (
    <polygon points={`${width},${baseY} 0,${baseY} ${path}`} fill={color} />
  );
};

export default ({ data, lightsOnTime, lightsOffTime }: Props) => {
  const countDays = size(data);
  const [xPos, setXPos] = useState(0);
  const overlay = useRef(undefined);

  const handleMouseMove = (e: { screenX: React.SetStateAction<number> }) =>
    overlay && setXPos(e.screenX - overlay.current.getBoundingClientRect().x);

  return (
    <x.div h="100%" position="relative">
      <svg
        viewBox={`0 0 ${countDays - 1} ${24 * 60 * 60}`}
        style={{ width: "100%", height: "100%" }}
        preserveAspectRatio="none"
      >
        <Area data={data} event="sunrise" placement="top" color="lightblue" />
        <Area data={data} event="sunset" placement="bottom" color="lightblue" />
        <Area data={data} event="civrise" placement="top" color="yellow" />
        <Area data={data} event="civset" placement="bottom" color="yellow" />
        <polygon
          points={`365,${24 * 60 * 60} 0,${24 * 60 * 60} 0,${
            24 * 60 * 60 - lightsOnTime * 60
          } 365,${24 * 60 * 60 - lightsOnTime * 60}`}
          fill="black"
        />
        <polygon
          points={`365,0 0,0 0,${24 * 60 * 60 - lightsOffTime * 60} 365,${
            24 * 60 * 60 - lightsOffTime * 60
          }`}
          fill="black"
        />
      </svg>
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
