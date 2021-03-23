import React from "react";
import styled from "styled-components";
import { Day, Moment } from "../../types";
import { Area } from "../area";
import { map, isNumber, size } from "lodash";
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

const seriesToNumbers = (data: Day[], moment: Moment): number[] =>
  map(
    data,
    day =>
      isNumber(moment) ? moment : timeToSeconds(day[moment] || "00:00:00")
  );

const Svg = styled.svg`
  width: 100%;
  height: 100%;
`;

export const PeriodLighting = ({ data, areas }: Props) => {
  const viewboxWidth = size(data) - 1;

  return (
    <Svg
      viewBox={`0 ${DAY_START} ${viewboxWidth} ${DAY_END}`}
      preserveAspectRatio="none"
      transform="scale(1, -1)"
    >
      {map(areas, ({ from, to, color }, i) => {
        const _from = seriesToNumbers(data, from);
        const _to = seriesToNumbers(data, to);
        return <Area key={i} from={_from} to={_to} color={color} />;
      })}
    </Svg>
  );
};
