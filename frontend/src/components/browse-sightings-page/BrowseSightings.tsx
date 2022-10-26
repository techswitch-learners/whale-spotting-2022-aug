import React, { useEffect, useState } from "react";
import {
  getSightings,
  getSightingsBySpeciesId,
  Sighting,
} from "../../clients/apiClient";
import { SightingCard } from "./SightingCard";
import "./BrowseSightings.scss";
import { useParams } from "react-router-dom";

export const BrowseSightings: React.FC = () => {
  const [sightings, setSightings] = useState<Sighting[]>();
  const { speciesId } = useParams<{ speciesId: string }>();

  if (speciesId === undefined) {
    useEffect(() => {
      getSightings().then(setSightings);
    }, []);
  } else {
    useEffect(() => {
      getSightingsBySpeciesId(speciesId).then(setSightings);
    }, []);
  }

  const heading = "Reported Sightings";

  if (sightings === undefined) {
    return (
      <>
        <h1>{heading}</h1>
        <p>Loading</p>
      </>
    );
  } else if (sightings.length === 0) {
    return (
      <>
        <h1>{heading}</h1>
        <p>Sorry, we have no sightings of that species!</p>
      </>
    );
  } else {
    return (
      <>
        <h1>{heading}</h1>
        <ul>
          {sightings?.map((sighting) => (
            <SightingCard sighting={sighting} key={sighting.id} />
          ))}
        </ul>
      </>
    );
  }
};
