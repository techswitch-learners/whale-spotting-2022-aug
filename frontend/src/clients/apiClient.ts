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
  id: number;
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

export const getSightings = async (): Promise<ListResponse<Sighting>> => {
  const response = await fetch(`https://localhost:5001/sightings`);
  return await response.json();
};
