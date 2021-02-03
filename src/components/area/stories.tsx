import React from "react";
import Area, { Props } from ".";
import { Story, Meta } from "@storybook/react/types-6-0";

export default {
  title: "Area",
  component: Area,
  args: { from: [5, 4, 7, 8, 9], to: [4, 0, 9, 3, 4], color: "#BADA55" },
  argTypes: { color: { control: { type: "color" } } }
} as Meta;

const Template: Story<Props> = args => (
  <svg viewBox="0 0 4 10" width="100%" height="100%" preserveAspectRatio="none">
    <Area {...args} />
  </svg>
);

export const Basic = Template.bind({});
