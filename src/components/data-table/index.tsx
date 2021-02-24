import React from "react";

export interface IProps {
  currentLightingTime: number;
  newLightingTime: number;
}

const INSTALLED_POWER = 58488;
const COST_PER_KWH = 0.1485;

const toEuros = (amount: number, precision: number = 0) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: precision,
    maximumFractionDigits: precision
  }).format(amount);

const toQuantity = (amount: number) =>
  new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);

const getAnnualCost = (lightingTime: number) =>
  (INSTALLED_POWER * COST_PER_KWH * lightingTime) / 1000;

const Component = ({ currentLightingTime, newLightingTime }: IProps) => {
  const currentAnnualCost = getAnnualCost(currentLightingTime);
  const newAnnualCost = getAnnualCost(newLightingTime);
  const savings = currentAnnualCost - newAnnualCost;

  return (
    <table>
      <tbody>
        <tr>
          <tr>Durée d'allumage annuelle</tr>
          <td>{toQuantity(newLightingTime)} heures</td>
        </tr>
        <tr>
          <tr>Puissance installée</tr>
          <td>{toQuantity(INSTALLED_POWER)} watts</td>
        </tr>
        <tr>
          <tr>Coût du kWh</tr>
          <td>{toEuros(COST_PER_KWH, 4)}</td>
        </tr>
        <tr>
          <tr>Coût annuel actuel</tr>
          <td>{toEuros(currentAnnualCost)}</td>
        </tr>
        <tr>
          <tr>Coût annuel avec vos paramètres</tr>
          <td>{toEuros(newAnnualCost)}</td>
        </tr>
        <tr>
          <tr>Économie réalisée</tr>
          <td>{toEuros(savings)}</td>
        </tr>
      </tbody>
    </table>
  );
};

Component.displayName = "Data table";

export default Component;
