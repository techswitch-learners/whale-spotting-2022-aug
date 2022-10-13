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
          <div className="header">{sighting.species}</div>
          <img className="image" src={sighting.imageUrl} alt="image of whale" />
        </div>
      ))}
    </div>
  );
};
