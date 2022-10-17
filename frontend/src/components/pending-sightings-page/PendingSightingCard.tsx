import React from "react";
import { LoginContext, LoginContextType } from "../login/LoginManager";
import { useState } from "react";
import {
  PendingSighting,
  getAllPendingSighting,
  ConfirmationRequest,
  confirmOrRejectSighting,
} from "../../clients/apiClient";

interface PendingSightingCardProps {
  sighting: PendingSighting;
  index: number;
  loginContext: LoginContextType;
}

export const PendingSightingCard: React.FC<PendingSightingCardProps> = ({
  sighting,
  index,
  loginContext,
}) => {
  const approveOrReject = (isConfirmed: boolean, sightingID: number) => {
    const confirmSightingRequest: ConfirmationRequest = {
      SightingId: sightingID,
      isApproved: isConfirmed,
    };
    confirmOrRejectSighting(
      confirmSightingRequest,
      loginContext.username,
      loginContext.password,
      setStatus
    );
  };
  const [status, setStatus] = useState("");

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
        {status === "" ? (
          <div>
            <button
              type="button"
              onClick={() => {
                approveOrReject(true, sighting.id);
                setStatus("Approved");
              }}
            >
              Approved
            </button>
            <button
              type="button"
              onClick={() => {
                approveOrReject(false, sighting.id);
                setStatus("Rejected");
              }}
            >
              Rejected
            </button>
          </div>
        ) : (
          <p>{status}</p>
        )}
      </ul>
    </div>
  );
};
