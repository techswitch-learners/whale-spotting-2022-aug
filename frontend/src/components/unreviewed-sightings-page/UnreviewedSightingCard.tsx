import React from "react";
import { UnreviewedSighting } from "../../clients/apiClient";
import "./UnreviewedSightingCard.scss";

interface UnreviewedSightingCardProps {
  sighting: UnreviewedSighting;
  setConfirmationStatus: (newStatus: number) => void;
}

export const UnreviewedSightingCard: React.FC<UnreviewedSightingCardProps> = ({
  sighting,
  setConfirmationStatus,
}) => {
  return (
    <div className="pending-sighting-card">
      <p>Post ID: {sighting.id}</p>
      <p>Species: {sighting.species}</p>
      <p>Seen By: {sighting.seenBy}</p>
      <p>Seen On: {sighting.seenOn}</p>
      <p>ImageUrl: {sighting.imageUrl}</p>
      <p>Description: {sighting.description}</p>
      <p>Whale Count: {sighting.whaleCount}</p>
      <p>Location: {sighting.location}</p>
      <p>Latitude: {sighting.latitude}</p>
      <p>Longitude: {sighting.longitude}</p>
      <fieldset>
        <input
          type="radio"
          name={sighting.id.toString()}
          onClick={() => {
            setConfirmationStatus(2);
          }}
        />
        Approve
        <input
          type="radio"
          name={sighting.id.toString()}
          onClick={() => {
            setConfirmationStatus(1);
          }}
        />
        Reject
      </fieldset>
    </div>
  );
};
