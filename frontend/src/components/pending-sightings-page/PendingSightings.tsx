import React, { useEffect, useState, useContext } from "react";
import { LoginContext } from "../login/LoginManager";
import {
  PendingSighting,
  getAllPendingSightings,
} from "../../clients/apiClient";
import { PendingSightingCard } from "./PendingSightingCard";

export const PendingSightings: React.FunctionComponent = () => {
  const [sightings, setSighting] = useState<PendingSighting[]>();

  useEffect(() => {
    const getPendingSightings = async () => {
      const pendingSightings = await getAllPendingSightings();
      setSighting(pendingSightings);
    };
    getPendingSightings();
  }, []);

  return (
    <>
      <h1>Pending Sighting</h1>

      <button>Submit</button>

      {sightings &&
        sightings.map((sighting: PendingSighting, index) => (
          <PendingSightingCard sighting={sighting} index={index} key={index} />
        ))}
    </>
  );
};
