import React from "react";

interface MarkerProps {
  text: string;
  lat: number;
  lng: number;
}

export const Marker: React.FC<MarkerProps> = ({ text }) => {
  return <div>{text}</div>;
};
