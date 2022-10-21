import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import {
  getAllPendingSightings,
  confirmOrRejectSighting,
  Sighting,
} from "../../clients/apiClient";
import { LoginContext } from "../login/LoginManager";
import { UnreviewedSightingCard } from "./UnreviewedSightingCard";

export type ConfirmationStatus = 1 | 2;

interface SightingReport {
  sighting: Sighting;
  success?: boolean;
  errorMessage?: string;
  pendingStatusChange?: ConfirmationStatus;
}

export const UnreviewedSightings: React.FunctionComponent = () => {
  const [sightingReports, setSightingReports] = useState<SightingReport[]>();

  const loginContext = useContext(LoginContext);

  if (!loginContext.isLoggedIn) {
    return <Redirect to="/login" />;
  }

  const getSightingReport = (sightingId: number): SightingReport => {
    if (sightingReports === undefined)
      throw new Error(
        "Cannot retrieve individual report until the sightings are loaded"
      );
    const foundReport = sightingReports.find(
      (report) => report.sighting.id === sightingId
    );
    if (foundReport === undefined)
      throw new Error(
        `Cannot find sighting report with sighting ID ${sightingId}`
      );
    return foundReport;
  };

  const setSightingReport = (sightingId: number, newReport: SightingReport) => {
    const newSightingReports = sightingReports?.map((report) =>
      report.sighting.id !== sightingId ? report : newReport
    );

    setSightingReports(newSightingReports);
  };

  const setSuccess = (sightingId: number, isSuccess: boolean): void => {
    setSightingReport(sightingId, {
      ...getSightingReport(sightingId),
      success: isSuccess,
    });
  };

  const setErrorMessage = (sightingId: number, message: string): void => {
    setSightingReport(sightingId, {
      ...getSightingReport(sightingId),
      errorMessage: message,
    });
  };

  const setPendingStatus = (
    sightingId: number,
    newStatus: ConfirmationStatus
  ): void => {
    setSightingReport(sightingId, {
      ...getSightingReport(sightingId),
      pendingStatusChange: newStatus,
    });
  };

  useEffect(() => {
    const getPendingSightings = async () => {
      const pendingSightings = await getAllPendingSightings();
      setSightingReports(
        pendingSightings.map((pendingSighting) => ({
          sighting: pendingSighting,
        }))
      );
    };
    getPendingSightings();
  }, []);

  const submitRequests: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    if (sightingReports === undefined) {
      console.warn("Requests were submitted before sightings were loaded.");
      return;
    }

    const requestPromises = sightingReports
      .filter(
        (sightingReport) => sightingReport.pendingStatusChange !== undefined
      )
      .map(async (sightingReport) => {
        if (sightingReport.pendingStatusChange === undefined) return;
        try {
          await confirmOrRejectSighting(
            sightingReport.sighting.id,
            { NewConfirmationStatus: sightingReport.pendingStatusChange },
            loginContext.username,
            loginContext.password
          );
          setSuccess(sightingReport.sighting.id, true);
        } catch (err) {
          setSuccess(sightingReport.sighting.id, false);
          setErrorMessage(
            sightingReport.sighting.id,
            (err as Error).toString()
          );
        }
      });
    await Promise.all(requestPromises);
  };

  if (sightingReports === undefined) {
    return (
      <>
        <h1>Unreviewed Sightings</h1>
        <p>Loading...</p>
      </>
    );
  }

  if (sightingReports?.length === 0) {
    return (
      <>
        <h1>Unreviewed Sightings</h1>
        <p>No unreviewed sightings to display</p>
      </>
    );
  }

  return (
    <>
      <h1>Unreviewed Sightings</h1>

      {sightingReports.filter((report) => report.success).length !== 0 ? (
        <>
          <p>The following sightings were successfully reviewed: </p>
          <ul>
            {sightingReports
              .filter((report) => report.success)
              .map((report) => {
                return (
                  <li key={report.sighting.id}>
                    {" "}
                    Sighting #{report.sighting.id}{" "}
                  </li>
                );
              })}
          </ul>
        </>
      ) : (
        <></>
      )}

      {sightingReports.filter((report) => report.success === false).length !==
      0 ? (
        <>
          <p>The following errors occured: </p>
          <ul>
            {sightingReports
              .filter((report) => !report.success)
              .map((report) => {
                return (
                  <li key={report.sighting.id}>
                    Sighting #{report.sighting.id}:{" "}
                    {report.errorMessage ?? "No error message"}
                  </li>
                );
              })}
          </ul>
        </>
      ) : (
        <></>
      )}

      {sightingReports
        .filter((report) => report.success !== true)
        .map((report) => (
          <UnreviewedSightingCard
            sighting={report.sighting}
            key={report.sighting.id}
            setConfirmationStatus={(newStatus) =>
              setPendingStatus(report.sighting.id, newStatus)
            }
          />
        ))}

      {sightingReports.filter((report) => report.success !== true).length !==
      0 ? (
        <button onClick={submitRequests}>Submit All</button>
      ) : (
        <p>No unreviewed sightings to display</p>
      )}
    </>
  );
};
