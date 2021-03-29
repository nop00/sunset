import React, { useCallback, useState } from "react";
import Slider from "@material-ui/core/Slider";
import { withStyles } from "@material-ui/core/styles";
import { range, map, throttle } from "lodash";
import { readableTime } from "../../utils/time";
import Tooltip from "@material-ui/core/Tooltip";

interface Props {
  value: [number, number];
  onChange: (event: any) => void;
  className?: string;
}

const marks = map(range(0, 25), tick => ({
  value: tick * 60 * 60,
  label: tick % 3 === 0 && tick + "h"
}));

const SunsetSlider = withStyles({
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#FFF",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": { boxShadow: "inherit" }
  },
  track: {
    height: 8,
    backgroundColor: "yellow",
    border: "1px solid rgba(0,0,0,.25)"
  },
  rail: { height: 10, backgroundColor: "midnightblue", opacity: 1 },
  mark: { backgroundColor: "white" },
  markActive: { backgroundColor: "black" }
})(Slider);

const SunsetTooltip = withStyles({ tooltip: { fontSize: "120%" } })(Tooltip);

const ValueLabelComponent = ({
  children,
  open,
  value
}: {
  children: React.ReactElement;
  open: boolean;
  value: number;
}) => (
  <SunsetTooltip open={open} enterTouchDelay={0} placement="top" title={value}>
    {children}
  </SunsetTooltip>
);

export const RangeSlider = ({
  value: initialValue,
  onChange,
  className
}: Props) => {
  const [value, setValue] = useState<number[]>(initialValue);

  const throttledChange = useCallback(
    throttle(nextValue => onChange(nextValue), 1000 / 60),
    []
  );

  const handleChange = (event: any, newValue: number | number[]) => {
    if (newValue[0] <= 9 * 60 * 60 && newValue[1] >= 17 * 60 * 60) {
      setValue(newValue as number[]);
      throttledChange(newValue);
    }
  };

  return (
    <SunsetSlider
      min={0}
      max={24 * 60 * 60}
      step={60 * 5}
      className={className}
      value={value}
      onChange={handleChange}
      valueLabelDisplay="on"
      valueLabelFormat={s => readableTime(s)}
      aria-labelledby="range-slider"
      marks={marks}
      ValueLabelComponent={ValueLabelComponent}
    />
  );
};
