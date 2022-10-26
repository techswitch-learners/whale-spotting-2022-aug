import React, { useEffect, useState } from "react";
import {
  getExternalSightings,
  getSightings,
  Sighting,
  ExternalSighting,
} from "../../clients/apiClient";
import { SightingCard } from "./SightingCard";
import "./BrowseSightings.scss";

export const BrowseSightings: React.FC = () => {
  const [sightings, setSightings] = useState<Sighting[]>();
  const [externalSightings, setExternalSightings] =
    useState<ExternalSighting[]>();

  useEffect(() => {
    getSightings().then(setSightings);
    getExternalSightings().then(setExternalSightings);
  }, []);

  if (sightings === undefined && externalSightings === undefined) {
    return <p>Loading</p>;
  }

  return (
    <>
      <h2>Reported Sightings</h2>
      <ul>
        {sightings?.map((sighting) => (
          <SightingCard sighting={sighting} key={sighting.id} />
        ))}
      </ul>
      <h2>Sighting from the Washington Whale Hotline</h2>
      <ul>
        {externalSightings?.map((apiSighting) => (
          <SightingCard sighting={apiSighting} key={apiSighting.id} />
        ))}
      </ul>
    </>
  );
};
