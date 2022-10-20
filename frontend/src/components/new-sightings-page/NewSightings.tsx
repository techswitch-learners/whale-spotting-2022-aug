import React, { useEffect, useState } from "react";
import { NewSightingForm } from "./NewSightingForm";
import { getAllSpecies, Species } from "../../clients/apiClient";

export const NewSightings: React.FunctionComponent = () => {
  const [whaleSpecies, setWhaleSpecies] = useState<Species[]>();

  useEffect(() => {
    getAllSpecies().then(setWhaleSpecies);
  }, []);

  return <NewSightingForm whaleSpecies={whaleSpecies} />;
};
