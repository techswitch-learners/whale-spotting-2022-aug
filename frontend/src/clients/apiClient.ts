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

export interface PendingSighting {
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

export const getAllSpecies = async (): Promise<Species[]> => {
  const response = await fetch(`${backendUrl}/whales`);
  const whaleListResponse: ListResponse<Species> = await response.json();
  return whaleListResponse.items;
};

export const getAllPengingSighting = async (): Promise<PendingSighting[]> => {
  const response = await fetch(`${backendUrl}/sightings/pending`);
  const pengingSighting: ListResponse<PendingSighting> = await response.json();
  return pengingSighting.items;
};
