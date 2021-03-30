import React from "react";
import styled from "styled-components";
import { Colors } from "../../constants";
import { map } from "lodash";

const LEGEND = [
  {
    color: Colors.Sunlight,
    text: "Jour"
  },
  {
    color: Colors.Twilight,
    text: "Crépuscule"
  },
  {
    color: Colors.Night,
    text: "Nuit"
  },
  {
    color: Colors.Lighting,
    text: "Éclairage artificiel"
  }
];

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Color = styled.div`
  width: 2em;
  height: 2em;
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.15) 0 0 0 1px inset;
  margin-right: 1em;
`;

const Text = styled.div`
  margin-right: 2em;
`;

export const Legend = () => (
  <Root>
    {map(LEGEND, ({ color, text }) => (
      <>
        <Color style={{ backgroundColor: color }} />
        <Text>{text}</Text>
      </>
    ))}
  </Root>
);
