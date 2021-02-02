import React from "react";

interface Props {
  from: number;
  to: number;
  value: number;
  onChange: (event: any) => void;
}

export default ({ from, to, value, onChange }: Props) => {
  const onSlide = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="slider-wrapper">
      <input
        type="range"
        min={from}
        max={to}
        defaultValue={value}
        step="1"
        onChange={onSlide}
      />
    </div>
  );
};
