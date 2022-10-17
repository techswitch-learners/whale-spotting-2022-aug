import React, { useEffect, useState, useContext } from "react";
import { LoginContext } from "../login/LoginManager";
import { Redirect } from "react-router-dom";
import {
  PendingSighting,
  getAllPengingSighting,
} from "../../clients/apiClient";
import { PendingSightingCard } from "./PendingSightingCard";

export const PendingSightings: React.FunctionComponent = () => {
  const [sightings, setSighting] = useState<PendingSighting[]>();
  const [selectedId, setSelectedId] = useState<number>();
  const [error, setError] = useState(undefined);
  const loginContext = useContext(LoginContext);

  useEffect(() => {
    const getPengingSighting = async () => {
      const pendingSighting = await getAllPengingSighting();
      setSighting(pendingSighting);
    };

    getPengingSighting();
  }, []);
  return (
    <>
      <h1>Pending Sighting</h1>

      {sightings &&
        sightings.map((sighting: PendingSighting, index) => (
          <>
            <PendingSightingCard sighting={sighting} index={index} />
          </>
        ))}
    </>
  );
};
