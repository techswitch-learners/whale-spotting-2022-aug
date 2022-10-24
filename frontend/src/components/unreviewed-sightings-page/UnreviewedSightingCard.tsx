import React from "react";
import { Sighting } from "../../clients/apiClient";
import "./UnreviewedSightingCard.scss";
import { ConfirmationStatus } from "./UnreviewedSightings";

interface UnreviewedSightingCardProps {
  sighting: Sighting;
  setConfirmationStatus: (newStatus: ConfirmationStatus) => void;
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
      <img src={sighting.imageUrl} />
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
            setConfirmationStatus("approved");
          }}
        />
        Approve
        <input
          type="radio"
          name={sighting.id.toString()}
          onClick={() => {
            setConfirmationStatus("rejected");
          }}
        />
        Reject
      </fieldset>
    </div>
  );
};
