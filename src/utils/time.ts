import { split } from "lodash";

export const timeToSeconds = (timestring: string) => {
  const [h, m, s] = split(timestring, ":");
  return (+h * 60 + +m) * 60 + +s;
};
