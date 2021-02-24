import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import Component, { IProps } from ".";

export default {
  title: Component.displayName,
  component: Component,
  args: { currentLightingTime: 4100, newLightingTime: 1515 },
  argTypes: {
    currentLightingTime: { control: { type: null, min: 0, max: 4100 } },
    newLightingTime: { control: { type: "range", min: 0, max: 4100 } }
  }
} as Meta;

export const Basic: Story<IProps> = args => <Component {...args} />;
Basic.storyName = "🔧 Basic";
