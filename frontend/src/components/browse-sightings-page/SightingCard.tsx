import { format } from "date-fns";
import React from "react";
import {
  Sighting,
  ExternalSighting,
  GenericSighting,
  isExternalSighting,
} from "../../clients/apiClient";
import "./BrowseSightings.scss";

interface SightingProps {
  sighting: GenericSighting;
}

export const SightingCard: React.FunctionComponent<SightingProps> = ({
  sighting,
}) => {
  const seenBy: string | undefined =
    (sighting as Sighting).seenBy ??
    (sighting as ExternalSighting).email.split("@")[0];

  const seenOn: Date | undefined =
    (sighting as Sighting).seenOn ?? (sighting as ExternalSighting).date;

  const imageUrl: string | undefined =
    (sighting as Sighting).imageUrl ?? (sighting as ExternalSighting).photoUrl;

  const description: string | undefined = (sighting as Sighting).description;

  const whaleCount: number | undefined = (sighting as Sighting).whaleCount;

  let speciesName: string | undefined;
  if (isExternalSighting(sighting)) {
    speciesName = sighting.species.map((s) => s.name).join(", ");
  } else {
    speciesName = sighting.species?.name;
  }

  return (
    <div className="sighting-card">
      {speciesName ? (
        <h3 className="sighting-card__title fade-in">
          Sighting of {speciesName}
        </h3>
      ) : (
        <h3 className="sighting-card__title fade-in">
          Sighting recorded by {seenBy ?? "an anonymous whale spotter"}
        </h3>
      )}

      <p className="sighting-card__date fade-in">
        {format(new Date(seenOn), "do MMM yyyy")}
      </p>
      {imageUrl != undefined ? (
        <img
          className="image fade-in"
          src={
            imageUrl
              ? `${imageUrl}`
              : "https://anomalylifestyle.com/wp-content/uploads/2021/12/whale-1-768x447.jpg"
          }
          alt={
            speciesName
              ? `${speciesName}`
              : "Picture of a whale of unknown species"
          }
        />
      ) : (
        <></>
      )}

      <div className="card-data fade-in">
        {description != undefined ? (
          <p>
            <span className="sighting-card__information">
              Description of sighting:{" "}
            </span>
            {description}
          </p>
        ) : (
          <></>
        )}
        {whaleCount != undefined ? (
          <p>
            <span className="sighting-card__information">
              Number of whales seen:{" "}
            </span>
            {whaleCount}
          </p>
        ) : (
          <></>
        )}
        {sighting.location != null ? (
          <p>
            <span className="sighting-card__information">Location: </span>
            {sighting.location.description}
          </p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
