import React, { useEffect, useState } from "react";
import { getAllSpecies, Species } from "../../clients/apiClient";
import { WhaleCard } from "./WhaleCard";
import "./Whaleopedia.scss";

export const Whaleopedia: React.FunctionComponent = () => {
  const [whales, setWhales] = useState<Species[]>();

  useEffect(() => {
    getAllSpecies().then(setWhales);
  }, []);

  if (whales === undefined) {
    return <p>Loading</p>;
  }

  return (
    <div className="whale-list">
      <h1>Whaleopedia</h1>
      {whales.map((whale, index) => {
        return <WhaleCard key={index} whale={whale} />;
      })}
    </div>
  );
};
