import React, { useCallback, useState } from "react";
import Slider from "@material-ui/core/Slider";
import { withStyles } from "@material-ui/core/styles";
import { range, map, throttle } from "lodash";
import { readableTime } from "../../utils/time";
import Tooltip from "@material-ui/core/Tooltip";
import { Colors } from "../../constants";
import { sliderValueToHumanTime } from "../../utils/time";

interface Props {
  value: [number, number];
  onChange: (event: any) => void;
  className?: string;
}

const markTickToHours = (value: number) => (value + 24) % 24;

const marks = map(range(-12, 13), tick => {
    const hours = markTickToHours(tick);
    return {
        value: tick * 60 * 60,
        label: hours !== 0 ? hours % 3 === 0 && hours + "h" : "Minuit"
    };
});

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
    height: 10,
    backgroundColor: Colors.Night,
  },
  rail: {
    height: 8,
    backgroundColor: Colors.Lighting,
    border: "1px solid rgba(0,0,0,.25)",
    opacity: 1
  },
  mark: { backgroundColor: "black" },
  markActive: { backgroundColor: "white" }
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
    const value = (newValue as number[]);//.map(sliderValueToTime);
    if (value[0] <= (value[1] - 1 * 60 * 60)) {
      setValue(value);
      throttledChange(value);
    }
  };

  return (
    <SunsetSlider
      min={-12 * 60 * 60}
      max={12 * 60 * 60}
      step={60 * 5}
      className={className}
      value={value}
      onChange={handleChange}
      valueLabelDisplay="on"
      valueLabelFormat={s => readableTime(sliderValueToHumanTime(s))}
      aria-labelledby="range-slider"
      marks={marks}
      ValueLabelComponent={ValueLabelComponent}
    />
  );
};
