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
    <div className="whale-card">
      <div className="whale-card__common-name">{whale.name}</div>
      <img className="whale-card__image" src={whale.photoUrl} />
      <div className="whale-card__scientific">
        Scientific Name: {whale.scientificName}
      </div>
      <div className="whale-card__description">
        Description: {whale.description}
      </div>
      <div className="whale-card__conservation">
        Conservation Status: {whale.conservationStatus.code}
      </div>
    </div>
  );
};
