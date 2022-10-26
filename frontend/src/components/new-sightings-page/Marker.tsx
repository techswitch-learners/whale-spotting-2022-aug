import { Point } from "./Map";
import React, { useState } from "react";
import "./NewSightingForm.scss";

const MyMarker = ({ id, title }: any) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleClick = () => {
    console.log(`You clicked on ${id}`);
  };

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div
      className={isHovering ? "circle hover" : "circle"}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <span className="circleText" title={title}>
        {title}
      </span>
    </div>
  );
};

export default MyMarker;
