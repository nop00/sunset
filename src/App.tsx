import React, { useState } from "react";
import { Ephemeris } from "./components/ephemeris";
import { VerticalRangeSlider } from "./components/vertical-range-slider";
import { Explanation } from "./components/explanation";
import data from "../data/ephemeris.json";
import "./styles.css";
import { x } from "@xstyled/styled-components";
import { map, split, join, random } from "lodash";
import { readableTime, yearlyLightingTime } from "./utils/time";

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

  const lightingTime = yearlyLightingTime(data, lightsOnTime, lightsOffTime);

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
      <div>Allumage : {readableTime(lightsOnTime)}</div>
      <div>Extinction : {readableTime(lightsOffTime)}</div>
      <div style={{ fontSize: "2em", fontWeight: "bold", color: "red" }}>
        IL FAUT INVERSER LES AIRES D'ALLUMAGE !!! LE JAUNE DOIT COLLER AU
        CRÉPUSCULE ET NON À MINUIT.
      </div>
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

      <Explanation newLightingTime={lightingTime} />
    </>
  );
};
