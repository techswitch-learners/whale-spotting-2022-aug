const backendUrl = process.env["REACT_APP_BACKEND_DOMAIN"];

export interface ListResponse<T> {
  items: T[];
}

export interface ListOfExternalApiReponse<T> {
  sightings: T[];
}

export interface SightingFromExternalApi {
  id: number;
  data: Date;
  location: LocationInfo;
  species: SpeciesDataFromExternalApi;
  photoUrl: string;
  email: string;
}

export interface LocationInfo {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  description: string;
}

export interface SpeciesDataFromExternalApi {
  id: number;
  name: string;
  latinName: string;
  photoUrl: string;
  description: string;
  endangeredStatus: string;
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
  seenBy: string;
  seenOn: string;
  species?: Species;
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

export const getExternalApiSightings = async (): Promise<
  SightingFromExternalApi[]
> => {
  const response = await fetch(
    `https://whale-spotting-external-api.herokuapp.com/api/sightings`
  );
  const externalApisightingsListResponse: ListOfExternalApiReponse<SightingFromExternalApi> =
    await response.json();
  return externalApisightingsListResponse.sightings;
};
