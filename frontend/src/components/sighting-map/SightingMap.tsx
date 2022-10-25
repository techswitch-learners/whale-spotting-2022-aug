import { Sighting } from "../../clients/apiClient";
import GoogleMapReact from "google-map-react";
import { Marker } from "./Marker";
import React from "react";
import "./SightingMap.scss";

interface SightingMapProps {
  sightings: Sighting[];
}

export const SightingMap: React.FC<SightingMapProps> = ({ sightings }) => {
  const points = sightings.map((sighting) => {
    return {
      id: sighting.id,
      title: sighting.seenBy,
      lat: sighting.latitude,
      lng: sighting.longitude,
    };
  });

  console.log(process.env);

  return (
    <div style={{ height: "100vh", width: "100vh" }}>
      <GoogleMapReact
        className="sighting-map"
        bootstrapURLKeys={{
          key: process.env["REACT_APP_MAP_API_KEY"],
          language: "en",
          region: "GB",
        }}
        defaultCenter={{ lat: 51.506, lng: -0.169 }}
        defaultZoom={15}
      >
        {points.map(({ lat, lng, id, title }) => {
          return <Marker text={title} key={id} lat={lat} lng={lng} />;
        })}
      </GoogleMapReact>
    </div>
  );
};
