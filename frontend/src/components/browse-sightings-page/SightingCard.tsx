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
      <h3 className="fade-in">{sighting.species}</h3>
      {sighting.imageUrl !== undefined ? (
        <img
          className="image fade-in"
          src={sighting.imageUrl}
          alt={sighting.species}
        />
      ) : (
        <img
          className="image fade-in"
          src="../../../public/logo.png"
          alt={sighting.species}
        />
      )}

      <div className="card-data fade-in">
        <p>
          <strong>Description: </strong>
          {sighting.description}
        </p>
        <p>
          <strong>No. whales: </strong>
          {sighting.whaleCount}
        </p>
        <p>
          <strong>Location: </strong>
          {sighting.location}
        </p>
      </div>
    </div>
  );
};
