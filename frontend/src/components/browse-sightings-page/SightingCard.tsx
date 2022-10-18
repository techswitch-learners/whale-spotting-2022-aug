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
      <h3 className="fade-in">{sighting.species.name}</h3>

      {sighting.imageUrl !== "" ? (
        <img
          className="image fade-in"
          src={sighting.imageUrl}
          alt={sighting.species.name}
        />
      ) : (
        <>
          <img
            className="image fade-in"
            src="https://clipartmag.com/images/baby-whale-clipart-19.png"
            alt={sighting.species.name}
          />
          <p className="warning">No image found</p>
        </>
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
