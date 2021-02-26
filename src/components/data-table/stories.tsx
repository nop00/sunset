import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import DataTable from ".";

export default {
  title: DataTable.displayName,
  component: DataTable,
  args: { currentLightingTime: 4100, newLightingTime: 1515 },
  argTypes: {
    currentLightingTime: { control: { type: null, min: 0, max: 4100 } },
    newLightingTime: { control: { type: "range", min: 0, max: 4100 } }
  }
} as Meta;

export const Basic: Story<React.ComponentProps<typeof DataTable>> = args => (
  <DataTable {...args} />
);
Basic.storyName = "🔧 Basic";
