import React from "react";
import { Sighting, SightingFromExternalApi } from "../../clients/apiClient";
import "./BrowseSightings.scss";

interface SightingProps {
  sighting: Sighting | SightingFromExternalApi;
}

export const SightingCard: React.FunctionComponent<SightingProps> = ({
  sighting,
}) => {
  const imageUrl: string | undefined =
    (sighting as Sighting).imageUrl ??
    (sighting as SightingFromExternalApi).photoUrl;

  const description: string | undefined = (sighting as Sighting).description;

  const whaleCount: number | undefined = (sighting as Sighting).whaleCount;

  return (
    <div className="sighting-card">
      <h3 className="fade-in">Sighting #{sighting.id}</h3>

      {imageUrl != undefined ? (
        <img
          className="image fade-in"
          src={imageUrl}
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
        {description != undefined ? (
          <p>
            <span className="sighting-card-information">Description: </span>
            {description}
          </p>
        ) : (
          <></>
        )}
        {whaleCount != undefined ? (
          <p>
            <span className="sighting-card-information">No. whales: </span>
            {whaleCount}
          </p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
