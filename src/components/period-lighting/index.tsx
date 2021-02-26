import React from "react";
import { Day, Moment } from "../../types";
import Area from "../area";
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

const seriesToNumbers = (data: Partial<Day>[], moment: Moment): number[] =>
  map(data, day => (isNumber(moment) ? moment : timeToSeconds(day[moment])));

const PeriodLighting = ({ data, areas }: Props) => {
  const viewboxWidth = size(data) - 1;

  return (
    <svg
      viewBox={`0 ${DAY_START} ${viewboxWidth} ${DAY_END}`}
      style={{ width: "100%", height: "100%" }}
      preserveAspectRatio="none"
      transform="scale(-1)"
    >
      {map(areas, ({ from, to, color }, i) => {
        const _from = seriesToNumbers(data, from);
        const _to = seriesToNumbers(data, to);
        return <Area key={i} from={_from} to={_to} color={color} />;
      })}
    </svg>
  );
};

export default PeriodLighting;
