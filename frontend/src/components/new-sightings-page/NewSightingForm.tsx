import React, { useState } from "react";
import {
  createSighting,
  CreateSightingRequest,
  Species,
} from "../../clients/apiClient";
import Select from "react-select";
import "./NewSightingForm.scss";

type LocationInputType =
  | "getLocationFromPhone"
  | "getLocationFromCoordinates"
  | "getLocationFromName";

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
  speciesId?: number;
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
  anyError: string;
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
    anyError: "",
  });
  const [locationInputType, setLocationInputType] =
    useState<LocationInputType>();
  const [locationInputTypeError, setLocationInputTypeError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocationInputType(event.target.value as LocationInputType);
  };

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
      anyError: "",
    });

    if (formValues.seenBy === "") {
      setFormErrors({
        ...formErrors,
        seenBy: "Please enter a name",
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
    if (locationInputType === undefined) {
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
        imageUrl: "Please enter a valid URL",
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
    } else {
      setFormErrors({
        ...formErrors,
        anyError: "Please provide valid information",
      });
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
        {formErrors.date !== "" ? <>{formErrors.date}</> : <></>}

        <fieldset>
          <legend>Choose how to input your location:</legend>
          <div className="location-input-choice">
            <input
              type="radio"
              value="getLocationFromPhone"
              checked={locationInputType === "getLocationFromPhone"}
              onChange={handleChange}
              disabled
            />
            <label htmlFor="getLocationFromPhone">Use my location</label>
          </div>
          <div className="location-input-choice">
            <input
              type="radio"
              value="getLocationFromCoordinates"
              checked={locationInputType === "getLocationFromCoordinates"}
              onChange={handleChange}
            />{" "}
            <label htmlFor="getLocationFromCoordinates">
              Enter latitude and longitude
            </label>
            {locationInputType === "getLocationFromCoordinates" && (
              <div className="lat-and-long-inputs">
                <input
                  type="number"
                  placeholder="Latitude"
                  min="-90"
                  max="90"
                  onChange={(e) => {
                    setFormValues({
                      ...formValues,
                      latitude: e.target.value,
                    });
                  }}
                />
                {formErrors.latitude !== "" ? (
                  <>{formErrors.latitude}</>
                ) : (
                  <></>
                )}
                <input
                  type="number"
                  placeholder="Longitude"
                  min="-180"
                  max="180"
                  onChange={(e) => {
                    setFormValues({
                      ...formValues,
                      longitude: e.target.value,
                    });
                  }}
                />
                {formErrors.longitude !== "" ? (
                  <>{formErrors.longitude}</>
                ) : (
                  <></>
                )}
              </div>
            )}
          </div>
          <div className="location-input-choice">
            <input
              type="radio"
              value="getLocationFromName"
              checked={locationInputType === "getLocationFromName"}
              onChange={handleChange}
              disabled
            />
            <label htmlFor="getLocationFromName">Start typing a location</label>
            <br />
            {locationInputTypeError !== "" ? (
              <>{locationInputTypeError}</>
            ) : (
              <></>
            )}
          </div>
        </fieldset>

        {whaleSpecies !== undefined ? (
          <Select
            onChange={(e) => {
              setFormValues({
                ...formValues,
                speciesId: e?.value,
              });
            }}
            options={whaleSpecies.map((species) => ({
              value: species.id,
              label: species.name,
            }))}
          />
        ) : (
          <p>Loading...</p>
        )}

        <input
          type="number"
          placeholder="Number of whales"
          step="1"
          onChange={(e) => {
            setFormValues({
              ...formValues,
              whaleCount: e.target.value,
            });
          }}
        />

        <input
          type="text"
          placeholder="Description"
          onChange={(e) => {
            setFormValues({
              ...formValues,
              description: e.target.value,
            });
          }}
        />

        <input
          type="url"
          placeholder="Image Url"
          onChange={(e) => {
            setFormValues({
              ...formValues,
              imageUrl: e.target.value,
            });
          }}
        />

        <input type="submit" value="Submit sighting" />
        {formErrors.anyError !== "" ? <>{formErrors.anyError}</> : <></>}
      </form>
    </>
  );
};
