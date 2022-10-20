import React, { useState } from "react";
import { Sighting, SightingFromExternalApi } from "../../clients/apiClient";
import "./BrowseSightings.scss";

interface SightingProps {
  apiSighting: SightingFromExternalApi;
}

export const SightingCardForExternalApi: React.FunctionComponent<
  SightingProps
> = ({ apiSighting }) => {
  return (
    <div className="sighting-card">
      <h3 className="fade-in">Sighting #{apiSighting.id}</h3>

      {apiSighting.photoUrl !== "" ? (
        <img
          className="image fade-in"
          src={apiSighting.photoUrl}
          alt={
            apiSighting.species?.name != null
              ? `${apiSighting.species?.name}`
              : "Picture of a whale of unknown species"
          }
        />
      ) : (
        <></>
      )}

      <div className="card-data fade-in">
        <p>
          <span className="sighting-card-information">Description: </span>
          {apiSighting.location.description}
        </p>
        <p>
          <span className="sighting-card-information">Location: </span>
          {apiSighting.location.name}
        </p>
      </div>
    </div>
  );
};
