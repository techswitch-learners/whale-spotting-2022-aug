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
    <div className="feed">
      {sightings.map((sighting, index) => (
        <div className="sighting-card" key={index}>
          <div className="header fade-in">{sighting.species}</div>
          <img
            className="image fade-in"
            src={sighting.imageUrl}
            alt="image of whale"
          />
          <div className="cardData fade-in">
            <p>
              <strong>description: </strong>
              {sighting.description}
            </p>
            <p>
              <strong>No. whales: </strong>
              {sighting.whaleCount}
            </p>
            <p>
              <strong>location: </strong>
              {sighting.location}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
