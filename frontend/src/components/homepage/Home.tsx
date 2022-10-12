import React, { useState } from "react";

export const Home: React.FunctionComponent = () => {
  const [locationInputType, setLocationInputType] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocationInputType(event.target.value);
  };

  return (
    <>
      <h1>Whale Spotting</h1>
      <p>Spot whales!</p>
      <form method="post">
        <input type="text" placeholder="name"></input>
        <input type="datetime-local"></input>
        <ul>
          <li>
            <input
              type="radio"
              value="automatic"
              checked={locationInputType === "automatic"}
              onChange={handleChange}
              disabled
            />
            Use my location
          </li>
          <li>
            <input
              type="radio"
              value="manual"
              checked={locationInputType === "manual"}
              onChange={handleChange}
            />
            Enter latitude and longitude
            {locationInputType === "manual" && (
              <div>
                <input type="number" min="-90" max="90" step="0.1" />
                Latitude
                <input type="number" min="-180" max="180" step="0.1" />
                Longitude
              </div>
            )}
          </li>
          <li>
            <input
              type="radio"
              value="autocomplete"
              checked={locationInputType === "autocomplete"}
              onChange={handleChange}
              disabled
            />
            Start typing a location
          </li>
        </ul>

        <button type="submit">Submit post</button>
      </form>
    </>
  );
};
