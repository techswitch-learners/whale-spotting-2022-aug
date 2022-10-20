import React, { useEffect } from "react";
import {
  PendingRequest,
  UnreviewedSighting as UnreviewedSighting,
  ConfirmOrRejectRequest,
  ErrorResponse,
} from "../../clients/apiClient";
import "./UnreviewedSightingCard.scss";

interface UnreviewedSightingCardProps {
  sighting: UnreviewedSighting;
  index: number;
  confirmationRequests: PendingRequest[];
  setConfirmationRequests: React.Dispatch<
    React.SetStateAction<PendingRequest[]>
  >;
  errors: ErrorResponse[];
}

export const UnreviewedSightingCard: React.FC<UnreviewedSightingCardProps> = ({
  sighting,
  index,
  confirmationRequests,
  setConfirmationRequests,
  errors,
}) => {
  const updateList = (sightingId: number, confirmationStatus: number) => {
    const newConfirmationRequestsArr = confirmationRequests.filter(
      (request) => request.sightingId != sightingId
    );
    const newConfirmationRequest: PendingRequest = {
      sightingId: sightingId,
      confirmationStatus: confirmationStatus,
    };
    newConfirmationRequestsArr.push(newConfirmationRequest);
    setConfirmationRequests(newConfirmationRequestsArr);
  };

  return (
    <div
      className={
        errors.find((error) => error.sightingId === sighting.id)
          ? "sighting-card error-sighting"
          : "sighting-card"
      }
    >
      <p>Post Number: {index + 1}</p>
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
      <div>
        <fieldset>
          <input
            type="radio"
            name={sighting.id.toString()}
            onClick={() => {
              updateList(sighting.id, 2);
            }}
          />
          Approve
          <input
            type="radio"
            name={sighting.id.toString()}
            onClick={() => {
              updateList(sighting.id, 1);
            }}
          />
          Reject
        </fieldset>
      </div>
    </div>
  );
};
