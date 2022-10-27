import React from "react";
import { ConfirmationStatus } from "../../clients/apiClient";
import "./PendingSightingCard.scss";
import { SightingReport } from "./PendingSightings";

interface PendingSightingCardProps {
  sightingReport: SightingReport;
  setConfirmationStatus: (newStatus: ConfirmationStatus) => void;
}

export const PendingSightingCard: React.FC<PendingSightingCardProps> = ({
  sightingReport,
  setConfirmationStatus,
}) => {
  const sighting = sightingReport.sighting;
  return (
    <div
      className={
        "sighting-card" +
        `${sightingReport.success === false ? " sighting-card__error" : ""}`
      }
    >
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
