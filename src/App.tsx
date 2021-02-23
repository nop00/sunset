import React, { useState } from "react";
import Ephemeris from "./components/ephemeris";
import data from "../data/ephemeris.json";
import "./styles.css";
import { x } from "@xstyled/styled-components";
import { map, split, join } from "lodash";
import VerticalRangeSlider from "./components/vertical-range-slider";
import { secondsToTime } from "./utils/time";

const SUMMER = new Date("2021-03-28");
const WINTER = new Date("2021-10-31");

const subtractAnHour = (time: string) => {
  const splitTime = split(time, ":");
  return join([+splitTime[0] - 1, splitTime[1], splitTime[2]], ":");
};

export default () => {
  const dataWithSavings = map(data, day => {
    const curDay = new Date(day.date);
    if (curDay > SUMMER && curDay < WINTER) {
      return {
        sunrise: subtractAnHour(day.sunrise),
        sunset: subtractAnHour(day.sunset),
        civrise: subtractAnHour(day.civrise),
        civset: subtractAnHour(day.civset)
      };
    }
    return day;
  });

  const [lightsOnTime, setLightsOnTime] = useState(5 * 60 * 60);
  const [lightsOffTime, setLightsOffTime] = useState(22 * 60 * 60);

  return (
    <>
      <VerticalRangeSlider
        from={0}
        to={9 * 60 * 60}
        value={lightsOnTime}
        onChange={setLightsOnTime}
      />
      <VerticalRangeSlider
        from={17 * 60 * 60}
        to={24 * 60 * 60}
        value={lightsOffTime}
        onChange={setLightsOffTime}
      />
      <div>Allumage : {secondsToTime(lightsOnTime)}</div>
      <div>Extinction : {secondsToTime(lightsOffTime)}</div>
      <x.div
        w={800}
        h={500}
        position="relative"
        m="50px auto"
        overflow="hidden"
      >
        <Ephemeris
          data={dataWithSavings}
          lightsOnTime={lightsOnTime}
          lightsOffTime={lightsOffTime}
        />
      </x.div>
    </>
  );
};
