import React from "react";
import "./Card.scss";

interface CardProps {
  title: string;
  imageUrl: string;
}

export const Card: React.FC<CardProps> = ({ title, imageUrl, children }) => {
  return (
    <div className="card">
      <h3 className="card__title">{title}</h3>
      <img className="card__image" src={imageUrl} alt={title} />
      <div className="card__contents">{children}</div>
    </div>
  );
};
