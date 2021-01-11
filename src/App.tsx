import React from "react";
import Ephemeris from "./components/ephemeris";
import data from "../data/ephemeris.json";
import HorizontalCursor from "./components/horizontal-cursor";
import "./styles.css";
import { x } from "@xstyled/styled-components";

export default () => (
  <>
    <x.div w={800} h={500} position="relative" m="50px auto" overflow="hidden">
      <Ephemeris data={data} />
    </x.div>
    {/*<HorizontalCursor data={data} />*/}
  </>
);
