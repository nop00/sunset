import React from "react";
import styled from "styled-components";
import { Day, Moment } from "../../types";
import { Area } from "../area";
import { map, isNumber, size, times } from "lodash";
import { timeToSeconds } from "../../utils/time";

interface Props {
  data: Day[];
  areas: {
    from: Moment;
    to: Moment;
    color: string;
  }[];
}

const DAY_START = 0;
const DAY_END = 24 * 60 * 60;

const MONTHS = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre"
];

const seriesToNumbers = (data: Day[], moment: Moment): number[] =>
  map(
    data,
    day =>
      isNumber(moment) ? moment : timeToSeconds(day[moment] || "00:00:00")
  );

const Root = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Svg = styled.svg`
  width: 100%;
  height: 100%;
`;

const Legend = styled.svg`
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;
`;

export const PeriodLighting = ({ data, areas }: Props) => {
  const viewboxWidth = size(data) - 1;

  return (
    <Root>
      <Svg
        viewBox={`0 ${DAY_START} ${viewboxWidth} ${DAY_END}`}
        preserveAspectRatio="none"
        transform="scale(1, -1)"
      >
        {map(areas, ({ from, to, color }, i) => {
          const _from = seriesToNumbers(data, from);
          const _to = seriesToNumbers(data, to);
          return <Area key={i} min={_from} max={_to} color={color} />;
        })}
      </Svg>
      <Legend style={{ position: "absolute" }}>
        {times(12, i => {
          const textX = (100 / 12) * i + 100 / 24 + "%";
          const textY = "50%";
          return (
            <>
              <text
                x={textX}
                y={textY}
                textAnchor="middle"
                style={{
                  transform: "rotate(-.25turn)",
                  transformOrigin: `${textX} ${textY}`
                }}
              >
                {MONTHS[i]}
              </text>
              <line
                x1={100 - (100 / 12) * i + "%"}
                x2={100 - (100 / 12) * i + "%"}
                y1={0}
                y2="100%"
                fill="red"
                strokeWidth={1}
                stroke="rgba(0,0,0,.5)"
              />
            </>
          );
        })}
      </Legend>
    </Root>
  );
};
