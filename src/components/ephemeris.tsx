import React, { useState } from "react";
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
}

const Area = ({
  data,
  width,
  event1,
  event2,
  color,
}: {
  data: Day[];
  width: number;
  event1: number | string;
  event2: number | string;
  color: string;
}) => (
  <polygon
    points={`${width},0 0,0 ${join(
      map(data, (day, i) => i + "," + timeToSeconds(day.sunrise)),
      " "
    )}`}
  />
);

export default ({ data }: Props) => {
  const countDays = size(data);
  const totalHeight = 24 * 60 * 60;
  const [xPos, setXPos] = useState(0);

  return (
    <x.div position="relative">
      <svg
        viewBox={`0 0 ${countDays - 1} ${24 * 60 * 60}`}
        style={{ width: "100%", height: "100%" }}
        preserveAspectRatio="none"
      >
        <polygon
          points={`${countDays - 1},0 0,0 ${join(
            map(data, (day, i) => i + "," + timeToSeconds(day.sunrise)),
            " "
          )}`}
        />
        <polygon
          points={`${countDays - 1},${totalHeight} 0,${totalHeight} ${join(
            map(data, (day, i) => i + "," + timeToSeconds(day.sunset)),
            " "
          )}`}
        />
      </svg>
      <x.div
        position="absolute"
        top={0}
        left={0}
        bottom={0}
        right={0}
        onMouseMove={(e: { screenX: React.SetStateAction<number> }) =>
          setXPos(e.screenX)
        }
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
