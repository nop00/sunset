import { isNumber, take, map, padStart, split, sum, round } from "lodash";
import { Day } from "../types";

export const timeToSeconds = (timestring: string) => {
  const [h, m, s] = split(timestring, ":");
  return (+h * 60 + +m) * 60 + +s;
};

export const secondsToTime = (seconds: number) => {
  let res = [],
    iterations = 3;
  while (seconds > 1 || iterations > 0) {
    const curr = seconds % 60;
    seconds -= curr;
    res.unshift(padStart("" + curr, 2, "0"));
    seconds /= 60;
    iterations--;
  }
  return res.join(":");
};

export const readableTime = (time: string | number): string => {
  const timeString = isNumber(time) ? secondsToTime(time) : time;
  const [h, m] = take(split(timeString, ":"), 2);
  return `${parseInt(h)}h${m}`;
};

export const yearlyLightingTime = (
  data: Day[],
  lightsOnTime: number,
  lightsOffTime: number
): number =>
  round(
    sum(
      map(data, ({ sunrise, sunset }) => {
        const _sunrise: number = timeToSeconds(sunrise) - 15 * 60;
        const _sunset: number = timeToSeconds(sunset) + 15 * 60;
        return (
          (Math.max(_sunrise - lightsOnTime, 0) +
            Math.max(lightsOffTime - _sunset, 0)) /
          (60 * 60)
        );
      })
    ),
    2
  );
