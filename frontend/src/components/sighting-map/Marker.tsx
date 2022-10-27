export const Marker = ({ id, title, species }: any) => {
  return (
    <div className="sightings-map-pin">
      <img src="./logo.png" />
      <div className="pin-info">
        <p>{title}</p>
        <p>{species}</p>
      </div>
    </div>
  );
};
