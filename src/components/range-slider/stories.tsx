import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { RangeSlider } from ".";

export default {
  title: "RangeSlider",
  component: RangeSlider,
  args: { value: [5 * 60 * 60, 22 * 60 * 60] },
  argTypes: { onChange: {} }
} as Meta;

export const Basic: Story<React.ComponentProps<typeof RangeSlider>> = args => (
  <div style={{ marginTop: 50 }}>
    <RangeSlider {...args} />
  </div>
);
Basic.storyName = "🔧 Basic";
