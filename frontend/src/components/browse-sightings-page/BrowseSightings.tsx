import React, { useEffect, useState } from "react";
import { getSightings, Sighting } from "../../clients/apiClient";
import { SightingMap } from "../sighting-map/SightingMap";
import { SightingList } from "../sighting-list/SightingList";
import "./BrowseSightings.scss";

export const BrowseSightings: React.FC = () => {
  const [sightings, setSightings] = useState<Sighting[]>();
  const [isShowingMap, setIsShowingMap] = useState(false);

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
          setIsShowingMap(!isShowingMap);
        }}
      >
        {isShowingMap ? "List View" : "Map View"}
      </button>
      {isShowingMap ? (
        <SightingMap sightingList={sightings} />
      ) : (
        <SightingList sightingList={sightings} />
      )}
    </>
  );
};
