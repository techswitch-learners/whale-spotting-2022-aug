import React, { useEffect } from "react";
import { PendingSighting, ConfirmationRequest } from "../../clients/apiClient";

interface PendingSightingCardProps {
  sighting: PendingSighting;
  index: number;
  confirmationRequests: ConfirmationRequest[];
  setConfirmationRequests: React.Dispatch<
    React.SetStateAction<ConfirmationRequest[]>
  >;
}

export const PendingSightingCard: React.FC<PendingSightingCardProps> = ({
  sighting,
  index,
  confirmationRequests,
  setConfirmationRequests,
}) => {
  const updateList = (sightingId: number, confirmationStatus: number) => {
    const newConfirmationRequestsArr = confirmationRequests.filter(
      (item) => item.SightingId != sightingId
    );
    const newConfirmationRequest = {
      SightingId: sightingId,
      ConfirmationStatus: confirmationStatus,
    };
    newConfirmationRequestsArr.push(newConfirmationRequest);
    setConfirmationRequests(newConfirmationRequestsArr);
  };

  useEffect(() => {
    console.log(confirmationRequests);
  }, [confirmationRequests]);

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
      </ul>
    </div>
  );
};
