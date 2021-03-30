import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { Legend } from ".";

export default {
  title: "Legend",
  component: Legend
} as Meta;

export const Basic: Story<React.ComponentProps<typeof Legend>> = () => (
  <Legend />
);
Basic.storyName = "🔧 Basic";
