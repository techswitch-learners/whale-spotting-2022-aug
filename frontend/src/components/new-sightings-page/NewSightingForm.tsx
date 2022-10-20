import React, { useState } from "react";
import {
  createSighting,
  CreateSightingRequest,
  Species,
} from "../../clients/apiClient";
import Select from "react-select";
import "./NewSightingForm.scss";

interface NewSightingFormProps {
  whaleSpecies?: Species[];
}

interface FormValues {
  seenBy: string;
  date: string;
  latitude: string;
  longitude: string;
  description: string;
  imageUrl: string;
  speciesId: number;
  whaleCount: string;
}

interface FormErrors {
  seenBy: string;
  date: string;
  latitude: string;
  longitude: string;
  imageUrl: string;
  speciesId: string;
  whaleCount: string;
}

export const NewSightingForm: React.FC<NewSightingFormProps> = ({
  whaleSpecies,
}) => {
  const [formValues, setFormValues] = useState<FormValues>({
    seenBy: "",
    date: "",
    latitude: "",
    longitude: "",
    description: "",
    imageUrl: "",
    speciesId: 0,
    whaleCount: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    seenBy: "",
    date: "",
    latitude: "",
    longitude: "",
    imageUrl: "",
    speciesId: "",
    whaleCount: "",
  });
  const [locationInputType, setLocationInputType] = useState("");
  const [locationInputTypeError, setLocationInputTypeError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocationInputType(event.target.value);
  };
  let whaleSpeciesMenu: Species[] | undefined = undefined;
  if (whaleSpecies !== undefined) {
    whaleSpeciesMenu = whaleSpecies.map((species) => ({
      id: species.id,
      name: species.name,
    }));
  }

  const validateForm = () => {
    let numberOfErrors = 0;
    setFormErrors({
      ...formErrors,
      seenBy: "",
      date: "",
      latitude: "",
      longitude: "",
      imageUrl: "",
      speciesId: "",
      whaleCount: "",
    });

    if (formValues.seenBy === "") {
      setFormErrors({
        ...formErrors,
        seenBy: "Please enter a seenBy",
      });
      numberOfErrors++;
    }
    if (formValues.date === "") {
      setFormErrors({
        ...formErrors,
        date: "Please enter date",
      });
      numberOfErrors++;
    }
    if (locationInputType === "") {
      setLocationInputTypeError("Please select a way to input your location");
      numberOfErrors++;
    } else {
      if (formValues.latitude === "") {
        setFormErrors({
          ...formErrors,
          latitude: "Please enter a latitude",
        });
        numberOfErrors++;
      }
      if (formValues.longitude === "") {
        setFormErrors({
          ...formErrors,
          longitude: "Please enter a longitude",
        });
        numberOfErrors++;
      }
    }
    if (formValues.imageUrl && formValues.imageUrl.includes(" ")) {
      setFormErrors({
        ...formErrors,
        imageUrl: "Please enter a longitude",
      });
      numberOfErrors++;
    }

    return numberOfErrors;
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (validateForm() === 0) {
      const createSightingRequest: CreateSightingRequest = {
        seenBy: formValues.seenBy,
        seenOn: formValues.date,
        speciesId: formValues.speciesId,
        imageUrl: formValues.imageUrl,
        description: formValues.description,
        whaleCount: Number.parseInt(formValues.whaleCount),
        latitude: Number.parseFloat(formValues.latitude),
        longitude: Number.parseFloat(formValues.longitude),
      };
      createSighting(createSightingRequest);
    }
  };

  return (
    <>
      <h1>Whale Spotting</h1>
      <p>Spot whales!</p>
      <form className="new-sighting-form" method="post" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setFormValues({
              ...formValues,
              seenBy: e.target.value,
            });
          }}
        />
        {formErrors.seenBy !== "" ? <>{formErrors.seenBy}</> : <></>}

        <input
          type="datetime-local"
          onChange={(e) => {
            setFormValues({
              ...formValues,
              date: e.target.value,
            });
          }}
        />
        {dateError !== "" ? { dateError } : <></>}

        <fieldset>
          <legend>Choose how to input your location:</legend>
          <div className="location-input-choice">
            <input
              type="radio"
              value="automatic"
              checked={locationInputType === "automatic"}
              onChange={handleChange}
              disabled
            />
            <label htmlFor="automatic">Use my location</label>
          </div>
          <div className="location-input-choice">
            <input
              type="radio"
              value="manual"
              checked={locationInputType === "manual"}
              onChange={handleChange}
            />{" "}
            <label htmlFor="manual">Enter latitude and longitude</label>
            {locationInputType === "manual" && (
              <div className="lat-and-long-inputs">
                <input
                  type="number"
                  placeholder="Latitude"
                  min="-90"
                  max="90"
                  onChange={(e) => {
                    setLatitude(e.target.value);
                  }}
                />
                {latError !== "" ? { latError } : <></>}
                <input
                  type="number"
                  placeholder="Longitude"
                  min="-180"
                  max="180"
                  onChange={(e) => {
                    setLongitude(e.target.value);
                  }}
                />
                {longError !== "" ? { longError } : <></>}
              </div>
            )}
          </div>
          <div className="location-input-choice">
            <input
              type="radio"
              value="autocomplete"
              checked={locationInputType === "autocomplete"}
              onChange={handleChange}
              disabled
            />
            <label htmlFor="autocomplete">Start typing a location</label>
            {locationInputTypeError !== "" ? { locationInputTypeError } : <></>}
          </div>
        </fieldset>

        {whaleSpecies !== undefined ? (
          <Select
            onChange={(e) => {
              setSpeciesId(e.id);
            }}
            options={whaleSpeciesMenu}
          />
        ) : (
          <p>Loading...</p>
        )}

        <input
          type="number"
          placeholder="Number of whales"
          step="1"
          onChange={(e) => {
            setWhaleCount(e.target.value);
          }}
        />

        <input
          type="text"
          placeholder="Description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <input
          type="url"
          placeholder="Image Url"
          onChange={(e) => {
            setImageUrl(e.target.value);
          }}
        />

        <input type="submit" value="Submit sighting" />
      </form>
    </>
  );
};
