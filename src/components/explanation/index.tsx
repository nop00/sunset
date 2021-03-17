import React from "react";
import {
  CURRENT_LIGHTING_TIME,
  INSTALLED_POWER,
  COST_PER_WH,
  POPULATION,
  CYCLIST_HOURLY_PRODUCTION,
  HOUSEHOLD_YEARLY_CONSUMPTION
} from "../../constants";

interface IProps {
  newLightingTime: number;
}

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

export const Explanation = ({ newLightingTime }: IProps) => {
  const energySaving =
    (CURRENT_LIGHTING_TIME - newLightingTime) * INSTALLED_POWER;
  const moneySaving = energySaving * COST_PER_WH;
  const moneySavingPerCapita = moneySaving / POPULATION;
  const cyclistsSaving = energySaving / CYCLIST_HOURLY_PRODUCTION;
  const householdsSaving = energySaving / HOUSEHOLD_YEARLY_CONSUMPTION;

  return (
    <div>
      <div style={{ fontSize: "200%", textAlign: "center" }}>
        {energySaving === 0 ? (
          <span>
            Bougez les curseurs pour voir quelles économies la commune pourrait
            réaliser en éteignant l'éclairage public une partie de la nuit 🌌.
          </span>
        ) : (
          <span className="sentence">
            Avec ces réglages,
            <br />
            la commune économiserait{" "}
            <strong>{toQuantity(energySaving)} kWh</strong> d'électricité,
            <br />
            c'est la consommation annuelle de{" "}
            <strong>{toQuantity(householdsSaving)} foyers français 👨‍👩‍👧‍👦</strong>
            <br />
            ou l'énergie produite par{" "}
            <strong>{toQuantity(cyclistsSaving)} cyclistes 🚴‍♀️</strong> en une
            heure.
            <br />
            Cette économie représenterait{" "}
            <strong>{toEuros(moneySaving)} 💶</strong>,<br />
            soit{" "}
            <strong>{toEuros(moneySavingPerCapita, 2)} par Capellois</strong> et
            par an.
          </span>
        )}
      </div>

      <div className="sources">
        <h3>Sources</h3>
        <dl>
          <dt>
            Puissance électrique installée ({toQuantity(INSTALLED_POWER)}
            &#8239;kilowatts), durée d'éclairage annuel (
            {toQuantity(CURRENT_LIGHTING_TIME)}
            &#8239;heures) et coût horaire du kWh ({toEuros(COST_PER_WH, 4)})
          </dt>
          <dd>
            Factures d'électricité d'éclairage public de La Chapelle-en-Serval
            de 2019 (consultables en mairie)
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
            Population de La Chapelle-en-Serval en 2017 (
            {toQuantity(POPULATION)}
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
    </div>
  );
};
