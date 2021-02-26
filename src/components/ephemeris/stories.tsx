import React from "react";
import Ephemeris from ".";
import { Story, Meta } from "@storybook/react/types-6-0";
import data from "../../../data/ephemeris.json";

export default {
  title: "Ephemeris",
  component: Ephemeris,
  args: { data }
} as Meta;

const Template: Story<React.ComponentProps<typeof Ephemeris>> = args => (
  <Ephemeris {...args} />
);

export const Basic = Template.bind({});
