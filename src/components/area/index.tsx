import React from "react";
import { map, join, reverse } from "lodash";

export interface Props {
  from: number[];
  to: number[];
  color: string;
}

const getPoints = (series: number[], reversePoints?: boolean): string => {
  const points = map(series, (item, i) => `${i},${item}`);
  return join(reversePoints ? reverse(points) : points, " ");
};

export default ({ from, to, color = "blue" }: Props) => {
  const fromSeries = getPoints(from);
  const toSeries = getPoints(to, true);

  return <polygon points={`${fromSeries} ${toSeries}`} fill={color} />;
};
