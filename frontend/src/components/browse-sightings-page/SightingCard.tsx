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
      <h3 className="fade-in">Sighting #{sighting.id}</h3>

      {sighting.imageUrl !== "" ? (
        <img
          className="image fade-in"
          src={sighting.imageUrl}
          alt={
            sighting.species?.name != null
              ? `${sighting.species?.name}`
              : "Picture of a whale of unknown species"
          }
        />
      ) : (
        <></>
      )}

      <div className="card-data fade-in">
        <p>
          <span className="sighting-card-information">Description: </span>
          {sighting.description}
        </p>
        <p>
          <span className="sighting-card-information">No. whales: </span>
          {sighting.whaleCount}
        </p>
        {sighting.location != null ? (
          <p>
            <span className="sighting-card-information">Location: </span>
            {sighting.location.description}
          </p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
