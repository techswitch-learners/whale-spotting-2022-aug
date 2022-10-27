import React, { useEffect, useState } from "react";
import { getAllSpecies, getSpecie, Species } from "../../clients/apiClient";
import { WhaleCard } from "./WhaleCard";
import "./Whaleopedia.scss";

export const Whaleopedia: React.FunctionComponent = () => {
  const [whales, setWhales] = useState<Species[]>();
  const [searchName, setSearchName] = useState<string>("");

  useEffect(() => {
    const getSpecies = async () => {
      try {
        const name = await getSpecie(searchName);
        setWhales(name);
      } catch (err) {
        console.error("Error encountered when loading list of videos!");
      }
    };
    const getWhales = async () => {
      try {
        const species = await getAllSpecies();
        setWhales(species);
      } catch (err) {
        console.error("Error encountered when loading list of videos!");
      }
    };
    if (searchName == undefined || searchName == "") {
      getWhales();
    } else {
      getSpecies();
    }
  }, [searchName]);

  if (whales === undefined) {
    return <p>Loading</p>;
  }

  return (
    <>
      <label>
        Search:
        <input
          type="text"
          name="Search"
          onChange={(e) => setSearchName(e.target.value)}
        />
      </label>

      <h1>Whaleopedia</h1>
      <div className="whale-list">
        {whales.map((whale, index) => {
          return <WhaleCard key={index} whale={whale} />;
        })}
      </div>
    </>
  );
};
