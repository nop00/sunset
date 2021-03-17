import React from "react";

interface Props {
  from: number;
  to: number;
  value: number;
  onChange: (event: any) => void;
}

export const VerticalRangeSlider = ({ from, to, value, onChange }: Props) => {
  const onSlide = ({ target: { value } }: { target: { value: string } }) => {
    onChange(parseInt(value));
  };

  return (
    <div className="slider-wrapper">
      <input
        type="range"
        min={from}
        max={to}
        defaultValue={value}
        step="60"
        onChange={onSlide}
      />
    </div>
  );
};
