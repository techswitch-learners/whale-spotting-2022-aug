import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    <>
      <h1 className="whaleopedia_title">Whaleopedia</h1>
      <div className="whale-list">
        {whales.map((whale) => {
          const whaleRoute = "/sightings/species/" + whale.id;
          return (
            <Link className="whaleopedia__link" key={whale.id} to={whaleRoute}>
              <WhaleCard whale={whale} />
            </Link>
          );
        })}
      </div>
    </>
  );
};
