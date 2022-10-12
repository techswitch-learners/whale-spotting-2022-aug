import React, { useState } from "react";
import internal from "stream";
import "./Home.scss";

export const Home: React.FunctionComponent = () => {
  const [locationInputType, setLocationInputType] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [nameError, setNameError] = useState("");
  const [dateError, setDateError] = useState("");
  const [latError, setLatError] = useState("");
  const [longError, setLongError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocationInputType(event.target.value);
  };

  const validateForm = (
    name: string,
    date: string,
    imageUrl: string,
    latitude: string,
    longitude: string
  ) => {
    if (name === "") {
      setNameError("Required field");
    }
    if (imageUrl.includes(" ")) {
      setImageUrl("URL cannot contain spaces");
    }
    if (!date) {
      setDateError("Please enter date");
    }
    if (!latitude) {
      setLatError("Please enter a latitude");
    }
    if (!longitude) {
      setLongError("Please enter a longitude");
    }
  };

  const handleSubmit = () => {
    validateForm(name, date, imageUrl, latitude, longitude);
  };

  return (
    <div className="homePage">
      <h1>Whale Spotting</h1>
      <p>Spot whales!</p>
      <form className="newSightingForm" method="post" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        {nameError}
        <input
          type="datetime-local"
          onChange={(e) => {
            setDate(e.target.value);
          }}
        ></input>
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
              <div className="latAndLongInputs">
                <input
                  type="number"
                  placeholder="Latitude"
                  min="-90"
                  max="90"
                  step="0.1"
                  onChange={(e) => {
                    setLatitude(e.target.value);
                  }}
                />
                <input
                  type="number"
                  placeholder="Longitude"
                  min="-180"
                  max="180"
                  step="0.1"
                  onChange={(e) => {
                    setLongitude(e.target.value);
                  }}
                />
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
        <input
          type="text"
          placeholder="Description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="Image Url"
          onChange={(e) => {
            setImageUrl(e.target.value);
          }}
        ></input>
        <button type="submit">Submit post</button>
      </form>
    </div>
  );
};
