import React from "react";
import { SightingCard } from "../browse-sightings-page/SightingCard";
import { GenericSighting, isExternalSighting } from "../../clients/apiClient";
import "./SightingList.scss";

interface SightingListProps {
  sightings: GenericSighting[];
}

export const SightingList: React.FC<SightingListProps> = ({ sightings }) => {
  return (
    <ul className="sighting-list">
      {sightings.map((sighting) => {
        const id = isExternalSighting(sighting)
          ? `ext-${sighting.id}`
          : sighting.id;
        return <SightingCard sighting={sighting} key={id} />;
      })}
    </ul>
  );
};
