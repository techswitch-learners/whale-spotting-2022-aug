import React from "react";
import "./Card.scss";

interface CardProps {
  title: string;
  imageUrls?: string[];
}

export const Card: React.FC<CardProps> = ({ title, imageUrls, children }) => {
  return (
    <div className="card">
      <h3
        className="card__title"
        dangerouslySetInnerHTML={{ __html: title }}
      ></h3>
      <div>
        {imageUrls ? (
          imageUrls.map((imageUrl) => {
            return (
              <img
                key={imageUrl}
                className="card__image"
                src={imageUrl}
                alt={title}
              />
            );
          })
        ) : (
          <></>
        )}
      </div>
      <div className="card__contents">{children}</div>
    </div>
  );
};
