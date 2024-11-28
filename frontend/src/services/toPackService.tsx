import axiosInstance from "../services/axiosInstances";

interface ToPack {
    id?: string; 
    text: string;
    done: boolean;
}

export const getToPacksByTrip = async (tripId: string): Promise<ToPack[]> => {
    const response = await axiosInstance.get(`/trips/${tripId}/topacks`);
    return response.data;
};

export const createToPack = async (tripId: string, toPack: Partial<ToPack>): Promise<ToPack> => {
    const response = await axiosInstance.post(`/trips/${tripId}/topacks`, toPack);
    return response.data;
};

export const updateToPack = async (
    tripId: string,
    toPackId: string,
    updatedToPack: Partial<ToPack>
): Promise<ToPack> => {
    const response = await axiosInstance.put(`/trips/${tripId}/topacks/${toPackId}`, updatedToPack);
    return response.data;
};

export const deleteToPack = async (tripId: string, toPackId: string): Promise<void> => {
    await axiosInstance.delete(`/trips/${tripId}/topacks/${toPackId}`);
};
