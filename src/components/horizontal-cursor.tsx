import React from "react";
import { map } from "lodash";

export default ({ data }) => (
  <>
    <input type="range" list="tickmarks" style={{ width: "100%" }} />
    <datalist id="tickmarks">
      {map(data, (day) => (
        <option
          key={day.date.toString()}
          value={day.date.toString()}
          label={day.date.toString()}
        />
      ))}
    </datalist>
  </>
);
