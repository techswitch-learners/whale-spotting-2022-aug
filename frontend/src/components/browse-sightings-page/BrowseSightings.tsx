import React, { useEffect, useState } from "react";
import { getSightings, Sighting } from "../../clients/apiClient";
import { SightingCard } from "./SightingCard";
import "./BrowseSightings.scss";

export const BrowseSightings: React.FC = () => {
  const [sightings, setSightings] = useState<Sighting[]>();

  useEffect(() => {
    getSightings().then(setSightings);
  }, []);

  if (sightings === undefined) {
    return <p>Loading</p>;
  }
  const cardData: JSX.Element[] = sightings.map((sighting, index) => {
    return <div>the lot</div>;
  });

  return (
    <>
      <h1>Reported Sightings</h1>
      <ul>
        {sightings.map((sighting, index) => (
          //   const text:JSX.Element = ()=>{
          //   return(
          //     <div> sighting</>
          //   );
          // }
          <SightingCard sighting={sighting} key={sighting.id} />
        ))}
      </ul>
    </>
  );
};
