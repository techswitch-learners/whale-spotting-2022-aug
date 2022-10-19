import React, { useState } from "react";
import { Species } from "../../clients/apiClient";

interface SpeciesPageProps {
  species: Species;
}

export const SpeciesPage: React.FC<SpeciesPageProps> = ({ species }) => {
  return (
    <>
      <h1>{species.name}</h1>
      <p>{species.scientificName}</p>
      <p>{species.description}</p>
      <h2>Add a sighting</h2>
      <form action="/sightings" method="post">
        <label>
          Description:
          <input type="textarea" name="description"></input>
        </label>
        <input type="hidden" name="speciesId" value={species.id}></input>
        <input type="submit" value="Create sighting"></input>
      </form>
    </>
  );
};
