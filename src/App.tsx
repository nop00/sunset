import React, { useState } from "react";
import { Ephemeris } from "./components/ephemeris";
import { VerticalRangeSlider } from "./components/vertical-range-slider";
import { Explanation } from "./components/explanation";
import data from "../data/ephemeris.json";
import { map, split, join, random } from "lodash";
import { readableTime, yearlyLightingTime } from "./utils/time";
import styled, { createGlobalStyle } from "styled-components";

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

const GlobalStyle = createGlobalStyle`
  body {
    margin: 12px;
    font-family: sans-serif;
  }
`;

const SliderMorning = styled(VerticalRangeSlider)`
  position: absolute;
  left: 0;
  bottom: -77px;
`;

const SliderEvening = styled(VerticalRangeSlider)`
  position: absolute;
  left: 0;
  top: 6px;
`;

const EphemerisContainer = styled.div`
  width: 100%;
  max-width: 800px;
  height: 480px;
  position: relative;
  margin: 50px auto;
  padding-left: 36px;
`;

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
      <GlobalStyle />
      <EphemerisContainer>
        <SliderMorning
          from={minOnTime}
          to={maxOnTime}
          value={lightsOnTime}
          height={180}
          onChange={setLightsOnTime}
        />
        Allumage : {readableTime(lightsOnTime)}
        <SliderEvening
          from={minOffTime}
          to={maxOffTime}
          value={lightsOffTime}
          height={140}
          onChange={setLightsOffTime}
        />
        Extinction : {readableTime(lightsOffTime)}
        <Ephemeris
          data={dataWithSavings}
          lightsOnTime={lightsOnTime}
          lightsOffTime={lightsOffTime}
        />
      </EphemerisContainer>

      <Explanation newLightingTime={lightingTime} />
    </>
  );
};
