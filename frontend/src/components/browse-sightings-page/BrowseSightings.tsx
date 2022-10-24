import React, { useEffect, useState } from "react";
import { getSightings, Sighting } from "../../clients/apiClient";
import { SightingCard } from "./SightingCard";
import { SightingsListPage } from "./SightingsListPage";
import "./BrowseSightings.scss";

export const BrowseSightings: React.FC = () => {
  const [sightings, setSightings] = useState<Sighting[]>();

  useEffect(() => {
    getSightings().then(setSightings);
  }, []);

  if (sightings === undefined) {
    return <p>Loading</p>;
  }

  return (
    <>
      <h1>Reported Sightings</h1>
      <SightingsListPage sightings={sightings} />
    </>
  );
};
