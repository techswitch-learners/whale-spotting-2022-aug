import React, { useEffect, useState } from "react";
import { NewSightingForm } from "./NewSightingForm";
import { getAllSpecies, Species } from "../../clients/apiClient";

export const NewSightings: React.FunctionComponent = () => {
  const [whaleSpecies, setWhaleSpecies] = useState<Species[]>();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getAllSpecies().then(setWhaleSpecies);
  }, []);

  if (success) {
    return (
      <>
        <p>Successfully submitted</p>
        <button onClick={() => setSuccess(false)}>
          Report another sighting
        </button>
      </>
    );
  } else {
    return (
      <NewSightingForm setSuccess={setSuccess} whaleSpecies={whaleSpecies} />
    );
  }
};
