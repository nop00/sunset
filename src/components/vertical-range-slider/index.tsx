import React from "react";
import styled from "styled-components";

interface Props {
  from: number;
  to: number;
  value: number;
  height: number;
  onChange: (event: any) => void;
  className?: string;
}

const trackHeight = "8px";
const trackBg = "#3071a9";
const thumbBorder = "2px solid #000";
const thumbSize = "32px";
const thumbBg = "#FFF";

const Wrapper = styled.div<{ $height: number }>`
  display: inline-block;
  width: 32px;
  height: ${props => props.$height};
  padding: 0;
`;

const Input = styled.input<{ $height: number }>`
  appearance: none;
  margin: 18px 0;
  width: ${props => props.$height}px;
  height: 32px;
  transform-origin: 75px 75px;
  transform: rotate(-90deg);
  :focus {
    outline: none;
  }
  ::-webkit-slider-runnable-track {
    width: 100%;
    height: ${trackHeight};
    cursor: pointer;
    background: #3071a9;
  }
  ::-webkit-slider-thumb {
    border: ${thumbBorder};
    height: ${thumbSize};
    width: ${thumbSize};
    background: ${thumbBg};
    border-radius: 100%;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -12px;
  }
  :focus::-webkit-slider-runnable-track {
    background: ${trackBg};
  }
  ::-moz-range-track {
    width: 100%;
    height: ${trackHeight};
    cursor: pointer;
    background: #3071a9;
  }
  ::-moz-range-thumb {
    border: ${thumbBorder};
    height: ${thumbSize};
    width: ${thumbSize};
    background: ${thumbBg};
    border-radius: 100%;
    cursor: pointer;
  }
  ::-ms-track {
    width: 100%;
    height: ${trackHeight};
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    border-width: 16px 0;
    color: transparent;
  }
  ::-ms-fill-lower {
    background: #2a6495;
  }
  ::-ms-fill-upper {
    background: #3071a9;
  }
  ::-ms-thumb {
    border: ${thumbBorder};
    height: ${thumbSize};
    width: ${thumbSize};
    background: ${thumbBg};
    border-radius: 100%;
    cursor: pointer;
  }
  :focus::-ms-fill-lower {
    background: #3071a9;
  }
  :focus::-ms-fill-upper {
    background: ${trackBg};
  }
`;

export const VerticalRangeSlider = ({
  from,
  to,
  value,
  height,
  onChange,
  className
}: Props) => {
  const onSlide = ({ target: { value } }: { target: { value: string } }) => {
    onChange(parseInt(value));
  };

  return (
    <Wrapper className={className} $height={height}>
      <Input
        type="range"
        min={from}
        max={to}
        defaultValue={value}
        step="60"
        $height={height}
        onChange={onSlide}
      />
    </Wrapper>
  );
};
