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

const dataList = [
  {
    id: 1,
    species: "Whale",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Southern_right_whale.jpg/330px-Southern_right_whale.jpg",
    description: "this is a whale",
    whaleCount: 5,
    confirmationStatus: "approved",
    location: "pacific ocean",
    latitude: 5,
    longitude: 5,
  },
];

export const sightingData: Sighting[] = dataList;
