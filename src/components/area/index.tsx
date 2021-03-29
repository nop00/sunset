import React from "react";
import { map, join, reverse } from "lodash";

interface Props {
  min: number[];
  max: number[];
  color: string;
}

const getPoints = (series: number[], reversePoints?: boolean): string => {
  const points = map(series, (item, i) => `${i},${item}`);
  return join(reversePoints ? reverse(points) : points, " ");
};

export const Area = ({ min, max, color = "blue" }: Props) => {
  const fromSeries = getPoints(min);
  const toSeries = getPoints(max, true);

  return <polygon points={`${fromSeries} ${toSeries}`} fill={color} />;
};
