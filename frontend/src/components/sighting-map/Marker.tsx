import React from "react";

interface MarkerProps {
  text: string;
  lat: number;
  lng: number;
}

export const Marker = ({ id, title }: any) => {
  return (
    <div className="sightings-map-pin">
      <img src="./logo.png" />
      <p>{title}</p>
    </div>
  );
};

// export const Marker: React.FC<MarkerProps> = ({ text }) => {
//   return <div>{text}</div>;
// };
