namespace WhaleSpotting.Clients;

export interface ListResponse<T> {
    items: T[];
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

public class apiClient_ts
{
    export const getSightings = async (): Promise<ListResponse<Sighting>> => {
        const response = await fetch(`https://localhost:5001/sightings`);
        return await response.json();
    };
}