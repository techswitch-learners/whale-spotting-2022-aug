import { Sighting } from "../../clients/apiClient";
import { SightingCard } from "./SightingCard";

interface SightingsListPageProps {
  sightings: Sighting[];
}

export const SightingsListPage: React.FunctionComponent<
  SightingsListPageProps
> = ({ sightings }: SightingsListPageProps) => {
  return (
    <ul>
      {sightings.map((sighting, index) => (
        <SightingCard key={sighting.id} sighting={sighting} />
      ))}
    </ul>
  );
};
