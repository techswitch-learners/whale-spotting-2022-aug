import React from "react";

interface MarkerProps {
  text: string;
  lat: number;
  lng: number;
}

export const Marker: React.FC<MarkerProps> = ({ text }) => {
  // const handleClick = () => {
  //   console.log(You clicked on ${tooltip});
  // };

  return (
    <div className="circle">
      <span className="circleText">{text}</span>
    </div>
  );
};
