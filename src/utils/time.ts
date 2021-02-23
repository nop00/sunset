import { split, padStart } from "lodash";

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
