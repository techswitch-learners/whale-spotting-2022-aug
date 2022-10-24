import { Sighting } from "../../clients/apiClient";
// import { SlippyMap, Marker, Label, InfoBox } from "react-slippy-map";
import GoogleMapReact from "google-map-react";
import { Marker } from "./marker";
import React from "react";
import { map } from "leaflet";
import "./mapPage.scss";

interface MapPageProps {
  sightingList: Sighting[];
}

export const MapPage: React.FC<MapPageProps> = ({ sightingList }) => {
  const points = sightingList.map((sighting, index) => {
    return {
      id: sighting.id,
      title: sighting.seenBy,
      lat: sighting.latitude,
      lng: sighting.longitude,
    };
  });

  return (
    <div style={{ height: "100vh", width: "100vh" }}>
      ;
      <GoogleMapReact
        className="map"
        bootstrapURLKeys={{
          // remove the key if you want to fork
          key: "AIzaSyAiX_Ww0KPPTu7QZ2oODx5Jah9Ky1F7QTU",
          language: "en",
          region: "US",
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
