import React from "react";
import { PendingSighting } from "../../clients/apiClient";

interface PendingSightingCardProps {
  sighting: PendingSighting;
  index: number;
}

export const PendingSightingCard: React.FC<PendingSightingCardProps> = ({
  sighting,
  index,
}) => {
  return (
    <div className="sighting-card">
      <ul key={sighting.id} style={{ listStyle: "none" }}>
        <li>Post Number: {index + 1}</li>
        <li>Post ID: {sighting.id}</li>
        <li>Species: {sighting.species}</li>
        <li>Seen By: {sighting.seenBy}</li>
        <li>Soon On: {sighting.seenOn}</li>
        <li>ImageUrl: {sighting.imageUrl}</li>
        <li>Description: {sighting.description}</li>
        <li>Whale Count: {sighting.whaleCount}</li>
        <li>Location: {sighting.location}</li>
        <li>Latitude: {sighting.latitude}</li>
        <li>Longitude: {sighting.longitude}</li>
        <button type="button">Approved</button>
        <button type="button">Rejected</button>
      </ul>
    </div>
  );
};
