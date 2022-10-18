import React, { useEffect, useState, useContext } from "react";
import {
  PendingSighting,
  getAllPendingSightings,
  ConfirmationRequest,
  confirmOrRejectSighting,
} from "../../clients/apiClient";
import { LoginContext } from "../login/LoginManager";
import { PendingSightingCard } from "./PendingSightingCard";

export const PendingSightings: React.FunctionComponent = () => {
  const [sightings, setSighting] = useState<PendingSighting[]>();
  const [confirmationRequests, setConfirmationRequests] = useState<
    ConfirmationRequest[]
  >([]);
  const loginContext = useContext(LoginContext);

  useEffect(() => {
    const getPendingSightings = async () => {
      const pendingSightings = await getAllPendingSightings();
      setSighting(pendingSightings);
    };
    getPendingSightings();
  }, []);

  const approveOrReject = (confirmationRequests: ConfirmationRequest[]) => {
    // confirmationRequests.forEach(request => {
    //   confirmOrRejectSighting(
    //     request,
    //     loginContext.username,
    //     loginContext.password
    //   );
    // })
    // [], [] ,[]
    // confirmOrRejectSighting([])
    //
    const notSuccessRequest = confirmationRequests.map((request) => {
      const result = confirmOrRejectSighting(
        request,
        loginContext.username,
        loginContext.password
      );
      return result;
    });
    console.log(notSuccessRequest);
  };

  return (
    <>
      <h1>Pending Sighting</h1>

      {sightings &&
        sightings.map((sighting: PendingSighting, index) => (
          <PendingSightingCard
            sighting={sighting}
            index={index}
            key={index}
            confirmationRequests={confirmationRequests}
            setConfirmationRequests={setConfirmationRequests}
          />
        ))}
      <button onClick={() => approveOrReject(confirmationRequests)}>
        Submit All Selected Choicse
      </button>
    </>
  );
};
