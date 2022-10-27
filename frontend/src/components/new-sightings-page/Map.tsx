import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { Marker } from "./Marker";

interface LocationInfo {
  lat: number;
  lng: number;
}

interface DefaultProps {
  center: LocationInfo;
  zoom: number;
}

interface MapProps {
  setLatitude: (latitude: number) => void;
  setLongitude: (longitude: number) => void;
}

export const Map: React.FunctionComponent<MapProps> = ({
  setLatitude,
  setLongitude,
}) => {
  const defaultProps: DefaultProps = {
    center: {
      lat: 51.506,
      lng: -0.169,
    },
    zoom: 5,
  };

  const [selectedPoint, setSelectedPoint] = useState<LocationInfo>({
    lat: defaultProps.center.lat,
    lng: defaultProps.center.lng,
  });

  const defaultMapOptions = {
    fullscreenControl: false,
  };

  const googleMapApiKey = process.env["REACT_APP_MAP_API_KEY"];

  if (googleMapApiKey === undefined) {
    throw new Error(
      "Environment variable REACT_APP_MAP_API_KEY is not defined"
    );
  }

  return (
    <div className="map-box">
      <GoogleMapReact
        bootstrapURLKeys={{ key: googleMapApiKey }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        options={defaultMapOptions}
        onClick={(e) => {
          setSelectedPoint({
            lat: e.lat,
            lng: e.lng,
          });
          setLatitude(e.lat);
          setLongitude(e.lng);
        }}
      >
        <Marker lat={selectedPoint?.lat} lng={selectedPoint?.lng} />
      </GoogleMapReact>
    </div>
  );
};
