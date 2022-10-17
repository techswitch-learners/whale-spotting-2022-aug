import React, { useEffect, useState } from "react";
import { getSightings, Sighting } from "../../clients/apiClient";
import { SightingCard } from "./SightingCard";
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
    <div className="feed">
      <h1 className="title">Reported Sightings</h1>
      <div>
        {sightings.map((sighting, index) => (
          <SightingCard sighting={sighting} key={index} />
        ))}
      </div>
    </div>
  );
};
