import React from "react";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" }
};

export const decorators = [
  Story => (
    <div style={{ height: "calc(100vh - 2rem)" }}>
      <Story />
    </div>
  )
];
