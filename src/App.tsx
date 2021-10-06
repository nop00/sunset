import React, { useState } from "react";
import { Ephemeris } from "./components/ephemeris";
import { RangeSlider } from "./components/range-slider";
import { Explanation } from "./components/explanation";
import { Legend } from "./components/legend";
import { getSunData } from "./utils/ephemeris";
import { map, split, join, random } from "lodash";
import { readableTime, yearlyLightingTime } from "./utils/time";
import styled, { createGlobalStyle } from "styled-components";
import { sliderValueToHumanTime } from "./utils/time";

const SUMMER = new Date("2021-03-28");
const WINTER = new Date("2021-10-31");

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

const Centerer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const EphemerisContainer = styled.div`
  height: 50vh;
`;

export default () => {
  const data = getSunData();
  const dataWithSavings = map(data, day => {
    const curDay = new Date(day.date);
    if (curDay > SUMMER && curDay < WINTER) {
      return {
        date: day.date,
        sunrise: offsetTime(day.sunrise),
        sunset: offsetTime(day.sunset),
        civrise: offsetTime(day.civrise),
        civset: offsetTime(day.civset),
      };
    }
    return day;
  });

  const [lightingTime, setLightingTime] = useState<[number, number]>([
    0,
    5 * 60 * 60
  ]);

  const lightingDuration = yearlyLightingTime(
    data,
    lightingTime[0],
    lightingTime[1]
  );

  return (
    <Centerer>
      <GlobalStyle />
      <Legend />
      <br />
      <EphemerisContainer>
        <Ephemeris
          data={dataWithSavings}
          lightsOffTime={sliderValueToHumanTime(lightingTime[0])}
          lightsOnTime={sliderValueToHumanTime(lightingTime[1])}
        />
      </EphemerisContainer>
      <br/>
      <RangeSlider value={lightingTime} onChange={setLightingTime} />
      <Explanation
        offTime={readableTime(sliderValueToHumanTime(lightingTime[0]))}
        onTime={readableTime(sliderValueToHumanTime(lightingTime[1]))}
        newLightingTime={lightingDuration}
      />
    </Centerer>
  );
};
