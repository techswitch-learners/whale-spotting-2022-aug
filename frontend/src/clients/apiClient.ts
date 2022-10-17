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

export interface Sighting {
  seenBy: string;
  seenOn: string;
  species: string;
  imageUrl: string;
  description: string;
  whaleCount: number;
  confirmationStatus: string;
  location: string;
  latitude: number;
  longitude: number;
}

export const getAllSpecies = async (): Promise<Species[]> => {
  const response = await fetch(`${backendUrl}/whales`);
  const whaleListResponse: ListResponse<Species> = await response.json();
  return whaleListResponse.items;
};

export const getSightings = async (): Promise<Sighting[]> => {
  const response = await fetch(`${backendUrl}/sightings`);
  const sightingsListResponse: ListResponse<Sighting> = await response.json();
  return sightingsListResponse.items;
};

export async function createSighting(createSightingRequest: Sighting) {
  const response = await fetch(`${backendUrl}/sightings`, {
    // Todo: change to default path before pushing
    method: "POST",
    body: JSON.stringify(createSightingRequest),
    headers: { "Content-Type": "application/json" },
  });

  // Todo: if no errors return something positive.
}
