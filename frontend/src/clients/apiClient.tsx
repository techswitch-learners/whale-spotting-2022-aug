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

export const getAllSpecies = async (): Promise<ListResponse<Species>> => {
  const response = await fetch(`https://localhost:5001/whales`);
  return await response.json();
};
