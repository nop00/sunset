import { secondsToTime, timeToSeconds } from "./time";

describe("timeToSeconds", () => {
  test("random value", () => {
    expect(timeToSeconds("08:46:02")).toEqual(31562);
  });
  test("null value", () => {
    expect(timeToSeconds("00:00:00")).toEqual(0);
  });
});

describe("secondsToTime", () => {
  test("random value", () => {
    expect(secondsToTime(31562)).toEqual("08:46:02");
  });
  test("null value", () => {
    expect(secondsToTime(0)).toEqual("00:00:00");
  });
});
