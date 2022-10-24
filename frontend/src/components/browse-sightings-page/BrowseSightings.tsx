import React, { useEffect, useState } from "react";
import { getSightings, Sighting } from "../../clients/apiClient";
import { SightingCard } from "./SightingCard";
// import {useNavigate} from "react-router-dom";
import "./BrowseSightings.scss";
import { MapPage } from "./MapPage";

export const BrowseSightings: React.FC = () => {
  const [sightings, setSightings] = useState<Sighting[]>();
  const [mapToggle, setMapToggle] = useState(false);

  useEffect(() => {
    getSightings().then(setSightings);
  }, []);

  if (sightings === undefined) {
    return <p>Loading</p>;
  }

  return (
    <>
      <h1>Reported Sightings</h1>
      <button
        onClick={() => {
          setMapToggle(!mapToggle);
        }}
      >
        Sightings Map
      </button>
      {!mapToggle ? (
        <ul>
          {sightings.map((sighting, index) => (
            <SightingCard sighting={sighting} key={sighting.id} />
          ))}
        </ul>
      ) : (
        // <h1>HELLO !!!!! </h1>
        <MapPage sightingList={sightings} />
      )}
    </>
  );
};
