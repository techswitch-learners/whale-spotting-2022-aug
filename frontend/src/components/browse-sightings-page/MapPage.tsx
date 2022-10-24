import { Sighting } from "../../clients/apiClient";
import { SlippyMap, Marker, Label, InfoBox } from "react-slippy-map";
import React from "react";
import { map } from "leaflet";
import "./mapPage.scss";

interface MapPageProps {
  sightingList: Sighting[];
}

export const MapPage: React.FC<MapPageProps> = ({ sightingList }) => {
  const coords = { latitude: 53.90824, longitude: 27.56136 };
  return (
    <SlippyMap
      className="map"
      center={coords}
      zoom={16}
      baseTilesUrl={"https://a.tile.openstreetmap.org/2/0/0.png"}
    >
      {sightingList.map((sighting) => {
        return (
          <Label
            key={sighting.id}
            coords={{
              latitude: sighting.latitude,
              longitude: sighting.longitude,
            }}
            text={`${sighting.seenBy}: ${sighting.species} on ${sighting.seenOn}`}
          />
        );
      })}
    </SlippyMap>
  );
};
