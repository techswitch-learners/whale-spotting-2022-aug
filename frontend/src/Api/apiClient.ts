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

export async function createSighting(createSightingRequest: Sighting) {
  const response = await fetch("https://localhost:5001/sightings/create", {
    method: "POST",
    body: JSON.stringify(createSightingRequest),
    headers: { "Content-Type": "application/json" },
  });
}
