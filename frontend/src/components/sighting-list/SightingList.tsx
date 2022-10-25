import React from "react";
import { SightingCard } from "../browse-sightings-page/SightingCard";
import { Sighting } from "../../clients/apiClient";

interface SightingListProps {
  sightings: Sighting[];
}

export const SightingList: React.FC<SightingListProps> = ({ sightings }) => {
  return (
    <ul>
      {sightings.map((sighting) => (
        <SightingCard sighting={sighting} key={sighting.id} />
      ))}
    </ul>
  );
};
