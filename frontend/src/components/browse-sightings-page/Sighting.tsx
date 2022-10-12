import React, { useState } from "react";
import { Sighting as SightingInterface } from "./sightingData";
import "./BrowseSightings.scss";

interface SightingProps {
  sightings: SightingInterface[];
}

export const Sighting: React.FunctionComponent<SightingProps> = ({
  sightings,
}) => {
  return (
    <div>
      {sightings.map((sighting, index) => (
        <div key={index}>
          {sighting.species}
          <img src={sighting.imageUrl} />
        </div>
      ))}
    </div>
  );
};
