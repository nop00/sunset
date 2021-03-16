import React, { useState } from "react";
import Ephemeris from "./components/ephemeris";
import VerticalRangeSlider from "./components/vertical-range-slider";
import DataTable from "./components/data-table";
import data from "../data/ephemeris.json";
import "./styles.css";
import { x } from "@xstyled/styled-components";
import { map, split, join, random } from "lodash";
import { secondsToTime } from "./utils/time";

const SUMMER = new Date("2021-03-28");
const WINTER = new Date("2021-10-31");

const minOnTime = 0; // Minuit
const maxOnTime = 9 * 60 * 60; // 9h
const minOffTime = 17 * 60 * 60; // 17h
const maxOffTime = 24 * 60 * 60; // Minuit

const offsetTime = (time: string) => {
  const splitTime = split(time, ":");
  return join([+splitTime[0] + 1, splitTime[1], splitTime[2]], ":");
};

export default () => {
  const dataWithSavings = map(data, day => {
    const curDay = new Date(day.date);
    if (curDay > SUMMER && curDay < WINTER) {
      return {
        date: day.date,
        sunrise: offsetTime(day.sunrise),
        sunset: offsetTime(day.sunset),
        civrise: offsetTime(day.civrise),
        civset: offsetTime(day.civset)
      };
    }
    return day;
  });

  const [lightsOnTime, setLightsOnTime] = useState(
    random(minOnTime, maxOnTime)
  );
  const [lightsOffTime, setLightsOffTime] = useState(
    random(minOffTime, maxOffTime)
  );

  return (
    <>
      <VerticalRangeSlider
        from={minOnTime}
        to={maxOnTime}
        value={lightsOnTime}
        onChange={setLightsOnTime}
      />
      <VerticalRangeSlider
        from={minOffTime}
        to={maxOffTime}
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

      <DataTable newLightingTime={3500} />
    </>
  );
};
