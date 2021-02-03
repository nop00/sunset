import React from "react";
import Component, { Props } from ".";
import { Story, Meta } from "@storybook/react/types-6-0";
import data from "../../../data/ephemeris.json";

export default {
  title: "Ephemeris",
  component: Component,
  args: { data }
} as Meta;

const Template: Story<Props> = args => <Component {...args} />;

export const Basic = Template.bind({});
