import React, { useState } from "react";
import { FormValues } from "./NewSightingForm";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";

interface LocationInfo {
  lat: number;
  lng: number;
}

interface DefaultProps {
  center: LocationInfo;
  zoom: number;
}

interface MapProp {
  formValues: FormValues;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
}

export const Map: React.FunctionComponent<MapProp> = ({
  formValues,
  setFormValues,
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
          setFormValues({
            ...formValues,
            latitude: e.lat.toString(),
            longitude: e.lng.toString(),
          });
        }}
      >
        <Marker lat={selectedPoint?.lat} lng={selectedPoint?.lng} />
      </GoogleMapReact>
    </div>
  );
};
