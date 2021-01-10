import React from "react";
import Ephemeris from "./components/ephemeris";
import data from "../data/ephemeris.json";
import HorizontalCursor from "./components/horizontal-cursor";
import "./styles.css"

export default () => (
  <>
    <Ephemeris data={data} />
    {/*<HorizontalCursor data={data} />*/}
  </>
);
