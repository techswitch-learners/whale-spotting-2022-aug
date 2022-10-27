import React, { useEffect, useState } from "react";
import {
  getSightings,
  getExternalSightings,
  Sighting,
  ExternalSighting,
  GenericSighting,
  getDate,
} from "../../clients/apiClient";
import { SightingMap } from "../sighting-map/SightingMap";
import { SightingList } from "../sighting-list/SightingList";
import "./BrowseSightings.scss";
import { compareDesc } from "date-fns";

export const BrowseSightings: React.FC = () => {
  const [sightings, setSightings] = useState<Sighting[]>();
  const [externalSightings, setExternalSightings] =
    useState<ExternalSighting[]>();

  let allSightings: GenericSighting[] = (
    (sightings as GenericSighting[]) ?? []
  ).concat(...(externalSightings ?? []));

  allSightings = allSightings.sort((a, b) =>
    compareDesc(getDate(a), getDate(b))
  );

  const [isShowingMap, setIsShowingMap] = useState(false);

  useEffect(() => {
    getSightings().then(setSightings);
    getExternalSightings().then(setExternalSightings);
  }, []);

  if (sightings === undefined && externalSightings === undefined) {
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
        <SightingMap sightings={allSightings} />
      ) : (
        <SightingList sightings={allSightings} />
      )}
    </>
  );
};
