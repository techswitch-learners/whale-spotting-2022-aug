import React, { useEffect, useState } from "react";
import {
  getExternalApiSightings,
  getSightings,
  Sighting,
  SightingFromExternalApi,
} from "../../clients/apiClient";
import { SightingCard } from "./SightingCard";
import { SightingCardForExternalApi } from "./SightingCardForExternalApi";
import "./BrowseSightings.scss";

export const BrowseSightings: React.FC = () => {
  const [sightings, setSightings] = useState<Sighting[]>();
  const [externalApiSightings, SightingFromExternalApi] =
    useState<SightingFromExternalApi[]>();

  useEffect(() => {
    getSightings().then(setSightings);
    getExternalApiSightings().then(SightingFromExternalApi);
  }, []);

  if (sightings === undefined || externalApiSightings === undefined) {
    return <p>Loading</p>;
  }

  return (
    <>
      <h1>Reported Sightings From External Api</h1>
      <ul>
        {externalApiSightings.map((apiSighting, index) => (
          <SightingCardForExternalApi
            apiSighting={apiSighting}
            key={apiSighting.id}
          />
        ))}
      </ul>
      <h1>Reported Sightings</h1>
      <ul>
        {sightings.map((sighting, index) => (
          <SightingCard sighting={sighting} key={sighting.id} />
        ))}
      </ul>
    </>
  );
};
