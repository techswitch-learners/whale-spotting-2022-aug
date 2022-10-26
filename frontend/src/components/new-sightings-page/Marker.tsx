import { Point } from "./Map";
import React from "react";

const MyMarker = ({ id, title }: Point) => {
  const handleClick = () => {
    console.log(`You clicked on ${id}`);
  };

  return (
    <div className={"circle"} onClick={handleClick}>
      <span className="circleText" title={title}>
        {title}
      </span>
    </div>
  );
};

export default MyMarker;
