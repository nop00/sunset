import React from "react";
import Component, { Props } from ".";
import { Story, Meta } from "@storybook/react/types-6-0";
import data from "../../../data/ephemeris.json";
import { take } from "lodash";

export default {
  title: "Period Lighting",
  component: Component,
  args: {
    data: take(data, 50),
    areas: [
      { from: 0, to: "sunrise", color: "#BADA55" },
      { from: "civrise", to: "sunrise", color: "blue" },
      { from: "sunrise", to: "civset", color: "rgba(0,255,167,.5)" },
      { from: "sunset", to: 24 * 60 * 60, color: "deeppink" }
    ]
  }
} as Meta;

const Template: Story<Props> = args => <Component {...args} />;

export const Basic = Template.bind({});
