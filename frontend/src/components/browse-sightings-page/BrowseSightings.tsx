import React, { useEffect, useState } from "react";
import {
  getSightings,
  getSightingsBySpeciesId,
  Sighting,
  SightingWithLocations,
} from "../../clients/apiClient";
import { SightingCard } from "./SightingCard";
import "./BrowseSightings.scss";
import { useParams } from "react-router-dom";

export const BrowseSightings: React.FC = () => {
  const [sightings, setSightings] = useState<
    Sighting[] | SightingWithLocations[]
  >();
  const { speciesId } = useParams<{ speciesId: string }>();

  if (speciesId === undefined) {
    console.log("speciesId empty");
    useEffect(() => {
      getSightings().then(setSightings);
    }, []);
  } else {
    console.log("speciesId present");
    useEffect(() => {
      getSightingsBySpeciesId(speciesId).then(setSightings);
    }, [speciesId]);
  }

  if (sightings === undefined) {
    return <p>Loading</p>;
  }

  return (
    <>
      <h1>Reported Sightings</h1>
      <ul>
        {sightings.map((sighting, index) => (
          <SightingCard sighting={sighting} key={index} />
        ))}
      </ul>
    </>
  );
};
