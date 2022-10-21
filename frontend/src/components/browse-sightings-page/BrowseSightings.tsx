import React, { useEffect, useState } from "react";
import {
  getSightings,
  getSightingsBySpeciesId,
  SightingWithLocations,
} from "../../clients/apiClient";
import { SightingCard } from "./SightingCard";
import "./BrowseSightings.scss";
import { useParams } from "react-router-dom";

export const BrowseSightings: React.FC = () => {
  const [sightings, setSightings] = useState<SightingWithLocations[]>();
  const { speciesId } = useParams<{ speciesId: string }>();

  if (speciesId === undefined) {
    useEffect(() => {
      getSightings().then(setSightings);
    }, []);
  } else {
    useEffect(() => {
      getSightingsBySpeciesId(speciesId).then(setSightings);
    }, [speciesId]);
  }

  let pageHeadline = "";

  if (sightings === undefined) {
    pageHeadline = "Loading";
  } else if (sightings.length === 0) {
    pageHeadline = "Sorry, no whales of that species have been seen";
  } else {
    pageHeadline = "Reported Sightings";
  }

  return (
    <>
      <h1>{pageHeadline}</h1>
      <ul>
        {sightings?.map((sighting, index) => (
          <SightingCard sighting={sighting} key={index} />
        ))}
      </ul>
    </>
  );
};
