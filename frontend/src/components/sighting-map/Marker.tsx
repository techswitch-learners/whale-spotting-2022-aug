import React from "react";

interface MarkerProps {
  title: string;
  speciesName?: string;
  lat: number;
  lng: number;
}

export const Marker: React.FC<MarkerProps> = ({ title, speciesName }) => {
  return (
    <div className="sightings-map__pin">
      <img src="./logo.png" />
      <div className="pin-info">
        <p>{title}</p>
        {speciesName ? <p>{speciesName}</p> : <></>}
      </div>
    </div>
  );
};
