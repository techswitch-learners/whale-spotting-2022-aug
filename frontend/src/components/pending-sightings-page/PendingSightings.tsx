import React, { useEffect, useState, useContext } from "react";
import { LoginContext } from "../login/LoginManager";
import { Redirect } from "react-router-dom";
import {
  PendingSighting,
  getAllPendingSighting,
  ConfirmationRequest,
} from "../../clients/apiClient";
import { PendingSightingCard } from "./PendingSightingCard";
import { confirmOrRejectSighting } from "../../clients/apiClient";

export const PendingSightings: React.FunctionComponent = () => {
  const [sightings, setSighting] = useState<PendingSighting[]>();
  const [confirmSightingRequest, setConfirmSightingRequest] =
    useState<ConfirmationRequest>();
  const loginContext = useContext(LoginContext);

  useEffect(() => {
    const getPendingSighting = async () => {
      const pendingSighting = await getAllPendingSighting();
      setSighting(pendingSighting);
    };

    getPendingSighting();
  }, []);

  return (
    <>
      <h1>Pending Sighting</h1>

      {sightings &&
        sightings.map((sighting: PendingSighting, index) => (
          <>
            <PendingSightingCard
              sighting={sighting}
              index={index}
              loginContext={loginContext}
            />
          </>
        ))}
    </>
  );
};
