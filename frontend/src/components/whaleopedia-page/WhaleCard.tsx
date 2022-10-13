import React, { useEffect, useState } from "react";
import {
  getAllSpecies,
  ListResponse,
  Species,
  ConservationStatus,
} from "../../clients/apiClient";
import "./Whaleopedia.scss";

interface WhaleCardProps {
  whale: Species;
}

export const WhaleCard: React.FC<WhaleCardProps> = ({ whale }) => {
  return (
    <div className="whale-list_card">
      <div className="whale-list_card--common-name">{whale.name}</div>

      <img className="whale-list_card--image" src={whale.photoUrl} />
      <div className="whale-list_card--scientific"> {whale.scientificName}</div>
      <div className="whale-list_card--description"> {whale.description}</div>
      <div className="whale-list_card--conservation">
        {whale.conservationStatus.code}
      </div>
    </div>
  );
};
