import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { Explanation } from ".";

export default {
  title: "Explanation",
  component: Explanation,
  args: { onTime: "5h", offTime: "22h", newLightingTime: 1515 },
  argTypes: {
    newLightingTime: { control: { type: "range", min: 0, max: 4100 } }
  }
} as Meta;

export const Basic: Story<React.ComponentProps<typeof Explanation>> = args => (
  <Explanation {...args} />
);
Basic.storyName = "🔧 Basic";
