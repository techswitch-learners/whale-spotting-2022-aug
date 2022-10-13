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
    <div className="sighting-card">
      {sightings.map((sighting, index) => (
        <div key={index}>
          {sighting.species}
          <img className="image" src={sighting.imageUrl} />
        </div>
      ))}
    </div>
  );
};
