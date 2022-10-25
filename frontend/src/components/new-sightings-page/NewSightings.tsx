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
        <p>Successfully submited</p>
        <button onClick={() => setSuccess(false)}>submit new</button>
      </>
    );
  } else {
    return (
      <NewSightingForm setSuccess={setSuccess} whaleSpecies={whaleSpecies} />
    );
  }
};
