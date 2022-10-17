import React, { useState } from "react";
import { createSighting, Sighting } from "../../Api/apiClient";

export const NewSightingForm: React.FunctionComponent = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [locationInputType, setLocationInputType] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [nameError, setNameError] = useState("");
  const [dateError, setDateError] = useState("");
  const [locationInputTypeError, setLocationInputTypeError] = useState("");
  const [latError, setLatError] = useState("");
  const [longError, setLongError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocationInputType(event.target.value);
  };

  const validateForm = () => {
    let numberOfErrors = 0;
    setNameError("");
    setDateError("");
    setLocationInputTypeError("");
    setLatError("");
    setLongError("");
    setImageUrl("");

    if (name === "") {
      setNameError("Please enter a name");
      numberOfErrors++;
    }
    if (date === "") {
      setDateError("Please enter date");
      numberOfErrors++;
    }
    if (locationInputType === "") {
      setLocationInputTypeError("Please select a way to input your location");
      numberOfErrors++;
    } else {
      if (latitude === "") {
        setLatError("Please enter a latitude");
        numberOfErrors++;
      }
      if (longitude === "") {
        setLongError("Please enter a longitude");
        numberOfErrors++;
      }
    }
    if (imageUrl && imageUrl.includes(" ")) {
      setImageUrl("URL cannot contain spaces");
      numberOfErrors++;
    }

    return numberOfErrors;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm() === 0) {
      const createSightingRequest: Sighting = {
        name: name,
        date: date,
        latitude: Number.parseFloat(latitude),
        longitude: Number.parseFloat(longitude),
        description: description,
        imageUrl: imageUrl,
      };
      createSighting(createSightingRequest);
    }
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
        />
        <p>{nameError}</p>

        <input
          type="datetime-local"
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        <p>{dateError}</p>

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
            />{" "}
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
                <p>{latError}</p>
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
                <p>{longError}</p>
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
        <p>{locationInputTypeError}</p>

        <input
          type="text"
          placeholder="Description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <input
          type="text"
          placeholder="Image Url"
          onChange={(e) => {
            setImageUrl(e.target.value);
          }}
        />

        <button type="submit">Submit sighting</button>
      </form>
    </div>
  );
};
