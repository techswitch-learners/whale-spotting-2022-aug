import React from "react";
import { SightingCard } from "../browse-sightings-page/SightingCard";
import { Sighting } from "../../clients/apiClient";

interface SightingListProps {
  sightingList: Sighting[];
}

export const SightingList: React.FC<SightingListProps> = ({ sightingList }) => {
  return (
    <ul>
      {sightingList.map((sighting) => (
        <SightingCard sighting={sighting} key={sighting.id} />
      ))}
    </ul>
  );
};
