import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import VerticalRangeSlider from ".";

export default {
  title: "VerticalRangeSlider",
  component: VerticalRangeSlider,
  args: {},
  argTypes: {}
} as Meta;

export const Basic: Story<
  React.ComponentProps<typeof VerticalRangeSlider>
> = args => <VerticalRangeSlider {...args} />;
Basic.storyName = "🔧 Basic";
