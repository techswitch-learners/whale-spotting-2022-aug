import React, { useState } from "react";
import internal from "stream";
import "./Home.scss";
import { Sighting, createSighting } from "../../Api/apiClient";
import { NewSightings } from "../new-sightings-page/NewSightings";

export const Home: React.FunctionComponent = () => {
  return (
    <div>
      <NewSightings />
    </div>
  );
};
