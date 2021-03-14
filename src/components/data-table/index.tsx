import React from "react";

interface IProps {
  newLightingTime: number;
}

const INSTALLED_POWER = 58.488;
const COST_PER_WH = 0.1485;
const HOUSEHOLD_YEARLY_CONSUMPTION = 4700;
const CYCLIST_HOURLY_PRODUCTION = 0.2;
const POPULATION = 3141;
const CURRENT_LIGHTING_TIME = 4100;

const toEuros = (amount: number, precision: number = 0) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: precision,
    maximumFractionDigits: precision
  }).format(amount);

const toQuantity = (amount: number, precision: number = 0) =>
  new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: precision
  }).format(amount);

const DataTable = ({ newLightingTime }: IProps) => {
  const energySaving =
    (CURRENT_LIGHTING_TIME - newLightingTime) * INSTALLED_POWER;
  const moneySaving = energySaving * COST_PER_WH;
  const moneySavingPerCapita = moneySaving / POPULATION;
  const cyclistsSaving = energySaving / CYCLIST_HOURLY_PRODUCTION;
  const householdsSaving = energySaving / HOUSEHOLD_YEARLY_CONSUMPTION;

  return (
    <div>
      <h2>Vos réglages</h2>
      <table>
        <tbody>
          <tr>
            <tr>Heure d'extinction</tr>
            <td>{}</td>
          </tr>
          <tr>
            <tr>Heure d'allumage</tr>
            <td>{}</td>
          </tr>
          <tr>
            <tr>Énergie économisée</tr>
            <td>{toQuantity(energySaving)} kWh</td>
          </tr>
          <tr>
            <tr>Argent économisé</tr>
            <td>{toEuros(moneySaving)}</td>
          </tr>
        </tbody>
      </table>

      <div style={{ fontSize: "200%", textAlign: "center" }}>
        {energySaving === 0 ? (
          <span>
            Bougez les curseurs pour voir quelles économies la commune pourrait
            réaliser en éteignant l'éclairage public une partie de la nuit 🌌.
          </span>
        ) : (
          <span>
            Avec vos réglages, la commune économiserait l'équivalent de la
            consommation annuelle moyenne de {toQuantity(householdsSaving)}{" "}
            foyers français 👨‍👩‍👧‍👦, soit l'énergie produite par{" "}
            {toQuantity(cyclistsSaving)} cyclistes 🚴‍♀️ en une heure.
            <br />
            Cette économie représenterait {toEuros(moneySaving)} 💶, soit{" "}
            {toEuros(moneySavingPerCapita, 2)} par Capellois et par an.
          </span>
        )}
      </div>

      <h3>Sources</h3>
      <dl style={{ fontSize: "80%" }}>
        <dt>
          Puissance électrique installée ({toQuantity(INSTALLED_POWER)}
          &#8239;kilowatts), durée d'éclairage annuel (
          {toQuantity(CURRENT_LIGHTING_TIME)}
          &#8239;heures) et coût horaire du kWh ({toEuros(COST_PER_WH, 4)})
        </dt>
        <dd>
          Factures d'électricité d'éclairage public de La Chapelle-en-Serval de
          2019 (consultables en mairie)
        </dd>

        <dt>
          Puissance fournie par un cycliste sans entraînement (
          {toQuantity(CYCLIST_HOURLY_PRODUCTION, 3)}
          &#8239;kilowatts)
        </dt>
        <dd>
          <a
            href="https://www.ecoco2.com/blog/compter-lenergie-et-si-on-remplacait-les-kwh-par-un-equivalent-humain/"
            target="_blank"
          >
            https://www.ecoco2.com/blog/compter-lenergie-et-si-on-remplacait-les-kwh-par-un-equivalent-humain/
          </a>
        </dd>

        <dt>
          Consommation moyenne d'un foyer français (
          {toQuantity(HOUSEHOLD_YEARLY_CONSUMPTION)}
          &nbsp;kilowatts-heures)
        </dt>
        <dd>
          <a
            href="https://particulier.edf.fr/fr/accueil/contrat-et-conso/options/tempo/details.html"
            target="_blank"
          >
            https://particulier.edf.fr/fr/accueil/contrat-et-conso/options/tempo/details.html
          </a>
          .
        </dd>
        <dt>
          Population de La Chapelle-en-Serval en 2017 ({toQuantity(POPULATION)}
          &nbsp;habitants)
        </dt>
        <dd>
          <a
            href="https://www.insee.fr/fr/statistiques/1405599?geo=COM-60142"
            target="_blank"
          >
            https://www.insee.fr/fr/statistiques/1405599?geo=COM-60142
          </a>
        </dd>
      </dl>
    </div>
  );
};

export default DataTable;
