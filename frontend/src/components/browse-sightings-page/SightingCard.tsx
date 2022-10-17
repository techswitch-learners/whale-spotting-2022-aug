import React, { useState } from "react";
import { Sighting } from "../../clients/apiClient";
import "./BrowseSightings.scss";

interface SightingProps {
  sighting: Sighting;
}

export const SightingCard: React.FunctionComponent<SightingProps> = ({
  sighting,
}) => {
  return (
    <div className="sighting-card">
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
  );
};
