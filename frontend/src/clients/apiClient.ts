const backendUrl = process.env["REACT_APP_BACKEND_DOMAIN"];

export interface ListResponse<T> {
  items: T[];
}

export interface ConservationStatus {
  id: number;
  code: string;
  description: string;
}

export interface Species {
  id: number;
  name: string;
  scientificName: string;
  description: string;
  photoUrl: string;
  conservationStatus: ConservationStatus;
}

export interface UnreviewedSighting {
  id: number;
  species?: string;
  seenBy: string;
  seenOn: Date;
  imageUrl?: string;
  description?: string;
  whaleCount: number;
  location?: string;
  latitude: number;
  longitude: number;
}

export interface PendingRequest {
  sightingId: number;
  confirmationStatus: number;
}

export interface ConfirmOrRejectRequest {
  confirmationStatus: number;
}

export interface ErrorResponse {
  sightingId: number;
  errorMessage: any;
}

export const getAllSpecies = async (): Promise<Species[]> => {
  const response = await fetch(`${backendUrl}/whales`);
  const whaleListResponse: ListResponse<Species> = await response.json();
  return whaleListResponse.items;
};

export const getAllPendingSightings = async (): Promise<
  UnreviewedSighting[]
> => {
  const response = await fetch(`${backendUrl}/sightings/pending`);
  const pengingSighting: ListResponse<UnreviewedSighting> =
    await response.json();
  return pengingSighting.items;
};

export const confirmOrRejectSighting = async (
  sightingId: number,
  confirmationRequest: ConfirmOrRejectRequest,
  username: string,
  password: string
): Promise<void> => {
  const response = await fetch(
    `${backendUrl}/sightings/${sightingId}/confirmation`,
    {
      method: "PATCH",
      headers: {
        authorization: `Basic ${btoa(`${username}:${password}`)}`,
      },
      body: JSON.stringify(confirmationRequest),
    }
  );
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Couldn't connect to database");
    }
    if (response.status === 401) {
      throw new Error(
        "Unauthorised - please check your login info and try again"
      );
    }
    if (response.status === 400) {
      throw new Error("Bad request - please contact Nick & Leo");
    }
  }
};
