import { isNumber, take, map, padStart, split, sum, round } from "lodash";
import { DAY_DURATION, MIDDAY_DURATION } from "../constants";
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

export const sliderValueToHumanTime = (value: number) => sliderValueToMathTime(value) % (24 * 60 * 60);
export const sliderValueToMathTime = (value: number) => (value + 24 * 60 * 60);

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
  lightsOffTime = sliderValueToHumanTime(lightsOffTime);
  lightsOnTime = sliderValueToHumanTime(lightsOnTime);
  const getOverlap = (r1Start: number, r1End: number, r2Start: number, r2End: number) => Math.min(r1End, r2End) - Math.max(r1Start, r2Start);
  return round(
    sum(
      map(data, ({ sunrise, sunset }) => {
        let _sunrise: number = timeToSeconds(sunrise) - 15 * 60;
        let _sunset: number = timeToSeconds(sunset) + 15 * 60;
        const maxLighting: number = _sunrise + (24 * 60 * 60 - _sunset);
        let overlap = 0;
        if (lightsOffTime < lightsOnTime) {
            // thank you https://stackoverflow.com/questions/3269434/whats-the-most-efficient-way-to-test-two-integer-ranges-for-overlap#comment93269152_12888920
            overlap = getOverlap(_sunrise, _sunset, lightsOffTime, lightsOnTime);// Math.min(_sunset, lightsOnTime) - Math.max(_sunrise, lightsOffTime);
        } else {
            overlap = Math.max(getOverlap(_sunrise, _sunset, lightsOffTime, DAY_DURATION), 0);
            overlap += Math.max(getOverlap(_sunrise, _sunset, 0, lightsOnTime), 0);
        }
        return (maxLighting - (lightsOffDuration - Math.max(overlap, 0))) / (60 * 60);
      })
    ),
    2
  );
}
