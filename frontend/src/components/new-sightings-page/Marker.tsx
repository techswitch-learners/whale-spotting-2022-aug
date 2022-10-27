import React from "react";
import "./NewSightingForm.scss";

interface MarkerProps {
  lat: number;
  lng: number;
}

export const Marker: React.FC<MarkerProps> = () => {
  return (
    <div className="map-pin">
      <img src="./logo.png" />
    </div>
  );
};
