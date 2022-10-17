import React, { useState } from "react";
import internal from "stream";
import "./Home.scss";
import { Sighting, createSighting } from "../../clients/apiClient";
import { NewSightings } from "../new-sightings-page/NewSightings";

export const Home: React.FunctionComponent = () => {
  return (
    <div>
      <NewSightings />
    </div>
  );
};
