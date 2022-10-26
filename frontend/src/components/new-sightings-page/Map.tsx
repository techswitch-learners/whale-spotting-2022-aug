import React, { useEffect, useState } from "react";
import { FormValues, NewSightingForm } from "./NewSightingForm";
import { getAllSpecies, Species } from "../../clients/apiClient";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";

interface DefaultProps {
  center: LocationInfo;
  zoom: number;
}

interface LocationInfo {
  lat: number;
  lng: number;
}

export interface Point {
  id?: number;
  title?: string;
  lat?: number;
  lng?: number;
}

interface MapProp {
  formValues: FormValues;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
}

export const Map: React.FunctionComponent<MapProp> = ({
  formValues,
  setFormValues,
}) => {
  const points: Point[] = [
    { id: 1, title: "Round Pond", lat: 51.506, lng: -0.184 },
    { id: 2, title: "The Long Water", lat: 51.508, lng: -0.175 },
    { id: 3, title: "The Serpentine", lat: 51.505, lng: -0.164 },
  ];
  const [selectedPoint, setSelectedPoint] = useState<Point>();

  const defaultProps: DefaultProps = {
    center: {
      lat: 51.506,
      lng: -0.169,
    },
    zoom: 11,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        onClick={(e) => {
          setSelectedPoint({
            id: 1,
            title: "selectedPoint",
            lat: e.lat,
            lng: e.lng,
          });
          setFormValues({
            ...formValues,
            latitude: e.lat.toString(),
            longitude: e.lng.toString(),
          });

          console.log(e.lng);
          console.log(e.lat);
        }}
      >
        {/* {selectedPoint.map(({ lat, lng, id, title }:Point) => {
          return (
            <Marker key={id} lat={lat} lng={lng} id={id} title={title} />
          );
        })} */}
        <Marker
          lat={selectedPoint?.lat}
          lng={selectedPoint?.lng}
          id={selectedPoint?.id}
          title={selectedPoint?.title}
        />
      </GoogleMapReact>
    </div>
  );
};
