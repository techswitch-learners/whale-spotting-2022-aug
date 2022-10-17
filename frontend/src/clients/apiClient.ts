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
  name: string;
  date: string;
  latitude: number;
  //this should become nullable when we add
  //  "enter name manually" functionality
  longitude: number; //and so should this
  description?: string;
  imageUrl?: string;
}

export const getAllSpecies = async (): Promise<Species[]> => {
  const response = await fetch(`${backendUrl}/whales`);
  const whaleListResponse: ListResponse<Species> = await response.json();
  return whaleListResponse.items;
};

export async function createSighting(createSightingRequest: Sighting) {
  const response = await fetch("https://localhost:5001/sightings/create", {
    method: "POST",
    body: JSON.stringify(createSightingRequest),
    headers: { "Content-Type": "application/json" },
  });
}
