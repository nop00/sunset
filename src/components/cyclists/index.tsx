import React from "react";
import { join, times } from "lodash";

interface IProps {
  amount: number;
}

const EMOJIS = ["🚴🏻", "🚴‍♂️", "🚵🏾", "🚵🏻‍♀️", "🚵🏼‍♂️", "🚴‍♀️"];

const getRandomCyclist = () =>
  EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

const Cyclists = ({ amount }: IProps) => (
  <div>{join(times(amount, getRandomCyclist), "  ")}</div>
);

export default Cyclists;
