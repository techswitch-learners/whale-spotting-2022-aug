import React from "react";
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
      {sighting.species?.name ? (
        <h3 className="sighting-card__title fade-in">
          Sighting of {sighting.species?.name}
        </h3>
      ) : (
        <h3 className="sighting-card__title fade-in">
          Sighting recorded by {sighting.seenBy}
        </h3>
      )}

      <p className="sighting-card__date fade-in">
        {new Date(sighting.seenOn).toDateString()}
      </p>
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
          <span className="sighting-card__information">
            Description of sighting:{" "}
          </span>
          {sighting.description}
        </p>
        <p>
          <span className="sighting-card__information">
            Number of whales seen:{" "}
          </span>
          {sighting.whaleCount}
        </p>
      </div>
    </div>
  );
};
