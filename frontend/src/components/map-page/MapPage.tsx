import { Sighting } from "../../clients/apiClient";
import { SlippyMap, Marker, Label, InfoBox } from "react-slippy-map";

interface MapPageProps {
  sightingList: Sighting[];
}

export const MapPage: React.FC<MapPageProps> = ({ sightingList }) => {
  let coords = { latitude: 53.90824, longitude: 27.56136 };
  return (
    <SlippyMap center={{ latitude: 0, longitude: 0 }} zoom={16}>
      {sightingList.map((sighting) => {
        <Label
          coords={{
            latitude: sighting.latitude,
            longitude: sighting.longitude,
          }}
          text={`${sighting.seenBy}: ${sighting.species} on ${sighting.seenOn}`}
        />;
      })}
    </SlippyMap>
  );
};
