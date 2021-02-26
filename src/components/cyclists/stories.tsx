import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import Cyclists from ".";

export default {
  title: "Cyclists",
  component: Cyclists,
  args: { amount: 4.6 },
  argTypes: { amount: { control: { type: "range", min: 0, max: 500 } } }
} as Meta;

export const Basic: Story<React.ComponentProps<typeof Cyclists>> = args => (
  <Cyclists {...args} />
);
Basic.storyName = "🔧 Basic";
