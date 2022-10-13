import React, { useEffect, useState } from "react";
import { getAllSpecies, ListResponse, Species } from "../../clients/apiClient";
import { WhaleCard } from "./WhaleCard";
import "./Whaleopedia.scss";

export const Whaleopedia: React.FunctionComponent = () => {
  const [listOfWhales, setListOfWhales] = useState<ListResponse<Species>>();

  useEffect(() => {
    getAllSpecies().then(setListOfWhales);
  }, []);

  if (listOfWhales === undefined) {
    return <p>Loading</p>;
  }

  return (
    <div className="whale-list">
      <h1>Whaleopedia</h1>
      {listOfWhales.items.map((whale, index) => {
        return <WhaleCard key={index} whale={whale} />;
      })}
    </div>
  );
};
