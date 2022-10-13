import React, { useEffect, useState } from "react";
import { getAllSpecies, ListResponse, Species } from "../../clients/apiClient";
import "Whaleopedia.scss";

export const Whaleopedia: React.FunctionComponent = () => {
  const [listOfWhales, setListOfWhales] = useState<ListResponse<Species>>();

  useEffect(() => {
    getAllSpecies().then(setListOfWhales);
  }, []);

  if (listOfWhales === undefined) {
    return <p>Loading</p>;
  }
  return (
    <div>
      {listOfWhales.items.map((whale) => {
        return (
          <div>
            <img className="whale_info--image" src={whale.photoUrl} />

            <h1 className="whale_info--common-name">{whale.name}</h1>
            <h3 className="whale_info--scientific">{whale.scientificName}</h3>
          </div>
        );
      })}
      ;
    </div>
  );
};
