import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import {
  getAllPendingSightings,
  confirmOrRejectSighting,
  PendingRequest,
  UnreviewedSighting,
  ErrorResponse,
} from "../../clients/apiClient";
import { LoginContext } from "../login/LoginManager";
import { UnreviewedSightingCard } from "./UnreviewedSightingCard";

export const UnreviewedSightings: React.FunctionComponent = () => {
  const [successes, setSuccesses] = useState<number[]>([]);
  const [errors, setErrors] = useState<ErrorResponse[]>([]);
  const [sightings, setSighting] = useState<UnreviewedSighting[]>();
  const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([]);
  const loginContext = useContext(LoginContext);

  if (!loginContext.isLoggedIn) {
    return <Redirect to="/login" />;
  }

  useEffect(() => {
    const getPendingSightings = async () => {
      const pendingSightings = await getAllPendingSightings();
      setSighting(pendingSightings);
    };
    getPendingSightings();
  }, []);

  const submitRequests = async (pendingRequests: PendingRequest[]) => {
    const successArray: number[] = successes;
    const errorsArray: ErrorResponse[] = [];
    const requestPromises = pendingRequests.map(async (request) => {
      try {
        const result = await confirmOrRejectSighting(
          request.sightingId,
          { confirmationStatus: request.confirmationStatus },
          loginContext.username,
          loginContext.password
        );
        successArray.push(request.sightingId);
      } catch (err) {
        const error: ErrorResponse = {
          sightingId: request.sightingId,
          errorMessage: err,
        };
        errorsArray.push(error);
      }
    });
    await Promise.all(requestPromises);
    setSuccesses(successArray);
    errorsArray.sort((a, b) => a.sightingId - b.sightingId);
    setErrors(errorsArray);
  };

  return (
    <>
      <h1>Unreviewed Sightings</h1>

      {successes.length != 0 ? (
        <>
          <p>The following sightings were successfully approved: </p>
          <ul>
            {successes.map((Id) => {
              return <li key={Id}> Sighting #{Id} </li>;
            })}
          </ul>
        </>
      ) : (
        <></>
      )}

      {errors.length != 0 ? (
        <>
          <p>The following errors occured: </p>
          <ul>
            {errors.map((error) => {
              return (
                <li key={error.sightingId}>
                  {" "}
                  Sighting #{error.sightingId}: {error.errorMessage.toString()}
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <></>
      )}

      {sightings &&
        sightings
          .filter((sighting) => !successes.includes(sighting.id))
          .map((sighting: UnreviewedSighting, index) => (
            <UnreviewedSightingCard
              sighting={sighting}
              index={index}
              key={index}
              confirmationRequests={pendingRequests}
              setConfirmationRequests={setPendingRequests}
              errors={errors}
            />
          ))}
      <button onClick={() => submitRequests(pendingRequests)}>
        Submit All Selected Choicse
      </button>
    </>
  );
};
