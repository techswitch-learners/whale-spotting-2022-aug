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
      {!sighting.species?.name ? (
        <h3 className="sighting-card_title fade-in">
          Sighting recorded by {sighting.seenBy}
        </h3>
      ) : (
        <h3 className="sighting-card_title fade-in">
          Sighting of {sighting.species?.name}
        </h3>
      )}

      <h6 className="sighting-card_date fade-in">
        {new Date(sighting.seenOn).toDateString()}
      </h6>
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
          <span className="sighting-card-information">
            <strong>Description of sighting: </strong>
          </span>
          {sighting.description}
        </p>
        <p>
          <span className="sighting-card-information">
            <strong>Number of whales seen: </strong>
          </span>
          {sighting.whaleCount}
        </p>
      </div>
    </div>
  );
};
