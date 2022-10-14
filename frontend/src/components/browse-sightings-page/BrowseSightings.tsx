import React from "react";
// import { sightingData } from "./sightingData";
import { SightingCard } from "./SightingCard";
import {
  getSightings,
  Sighting as SightingInterface,
} from "../../clients/apiClient";
import "./BrowseSightings.scss";

export const BrowseSightings: () => Promise<JSX.Element> = async () => {
  // switch to the API by uncommenting
  const sightings = await getSightings();
  // const sightings = sightingData;

  return (
    <div className="feed">
      <h1 className="title">Reported Sightings</h1>
      <div>
        {sightings.map((sighting, index) => (
          <SightingCard sighting={sighting} key={index} />
        ))}
      </div>
    </div>
  );
};
