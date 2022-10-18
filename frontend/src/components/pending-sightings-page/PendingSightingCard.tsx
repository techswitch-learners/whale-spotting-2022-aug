import React from "react";
import { LoginContext } from "../login/LoginManager";
import { useState, useContext } from "react";
import {
  PendingSighting,
  ConfirmationRequest,
  confirmOrRejectSighting,
} from "../../clients/apiClient";

interface PendingSightingCardProps {
  sighting: PendingSighting;
  index: number;
}

export const PendingSightingCard: React.FC<PendingSightingCardProps> = ({
  sighting,
  index,
}) => {
  const approveOrReject = (buttonSeleted: number, sightingID: number) => {
    const confirmSightingRequest: ConfirmationRequest = {
      SightingId: sightingID,
      ConfirmationStatus: buttonSeleted,
    };
    confirmOrRejectSighting(
      confirmSightingRequest,
      loginContext.username,
      loginContext.password,
      setStatus
    );
  };
  const [status, setStatus] = useState<string>("");
  const [buttonSeleted, setButtonSeleted] = useState<number>(0);

  const loginContext = useContext(LoginContext);

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

        {status == "" ? (
          <div>
            <fieldset>
              <input
                type="radio"
                name={sighting.id.toString()}
                onClick={() => {
                  // approveOrReject(true, sighting.id);
                  setButtonSeleted(2);
                }}
              />
              Approve
              <input
                type="radio"
                name={sighting.id.toString()}
                onClick={() => {
                  // approveOrReject(false, sighting.id);
                  setButtonSeleted(1);
                }}
              />
              Reject
            </fieldset>
            <button
              onClick={() => {
                approveOrReject(buttonSeleted, sighting.id);
              }}
            >
              Submit
            </button>
          </div>
        ) : (
          <p>{status}</p>
        )}
      </ul>
    </div>
  );
};
