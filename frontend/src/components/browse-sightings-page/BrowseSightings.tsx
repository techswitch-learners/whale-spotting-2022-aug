import React from "react";
import { sightingData } from "./sightingData";
import { Sighting } from "./Sighting";
import "./BrowseSightings.scss";

export const BrowseSightings: React.FunctionComponent = () => {
  return (
    <main className="feed">
      <h1>Reported Sightings</h1>
      <Sighting sightings={sightingData} />
    </main>
  );
};
