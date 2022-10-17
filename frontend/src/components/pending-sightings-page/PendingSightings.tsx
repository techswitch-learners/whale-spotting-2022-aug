import React, { useEffect, useState, useContext } from "react";
import { LoginContext } from "../login/LoginManager";
import {
  PendingSighting,
  getAllPendingSighting,
} from "../../clients/apiClient";
import { PendingSightingCard } from "./PendingSightingCard";

export const PendingSightings: React.FunctionComponent = () => {
  const [sightings, setSighting] = useState<PendingSighting[]>();

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
          <PendingSightingCard sighting={sighting} index={index} />
        ))}
    </>
  );
};
