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
  lightsOffTime: number,
  lightsOnTime: number
): number => {
  const lightsOffDuration: number = lightsOnTime - lightsOffTime;
  return round(
    sum(
      map(data, ({ sunrise, sunset }) => {
        const _sunrise: number = timeToSeconds(sunrise) - 15 * 60;
        const _sunset: number = timeToSeconds(sunset) + 15 * 60;
        const maxLighting: number = _sunrise + (24 * 60 * 60 - _sunset);
        // thank you https://stackoverflow.com/questions/3269434/whats-the-most-efficient-way-to-test-two-integer-ranges-for-overlap#comment93269152_12888920
        const overlap = Math.min(_sunset, lightsOnTime) - Math.max(_sunrise, lightsOffTime);
        return (maxLighting - (lightsOffDuration - Math.max(overlap, 0))) / (60 * 60);
      })
    ),
    2
  );
}
