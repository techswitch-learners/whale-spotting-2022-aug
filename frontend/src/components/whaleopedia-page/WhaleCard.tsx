import React from "react";
import { Species } from "../../clients/apiClient";
import { Card } from "../card/Card";
import "./WhaleCard.scss";

interface WhaleCardProps {
  whale: Species;
}

export const WhaleCard: React.FC<WhaleCardProps> = ({ whale }) => {
  const whaleImagesUrl = whale.photoUrl.split(",");

  return (
    <Card title={whale.name} imageUrls={whaleImagesUrl}>
      <div className="whale-card__scientific">
        Scientific Name: {whale.scientificName}
      </div>
      <div className="whale-card__description">
        Description: {whale.description}
      </div>
      <div className="whale-card__conservation">
        Conservation Status: {whale.conservationStatus.code}
      </div>
    </Card>
  );
};
