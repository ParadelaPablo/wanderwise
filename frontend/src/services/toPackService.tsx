import axiosInstance from "../services/axiosInstances";

interface ToPack {
  id?: string;
  text: string;
  done: boolean;
}

export const getToPacksByTrip = async (tripId: string): Promise<ToPack[]> => {
  const response = await axiosInstance.get(`/${tripId}/trips/topacks`);
  return response.data;
};

export const createToPack = async (
  tripId: string,
  toPack: Partial<ToPack>
): Promise<ToPack> => {
  const response = await axiosInstance.post(`/${tripId}/trips/topacks`, toPack);
  return response.data;
};

export const updateToPack = async (
  tripId: string,
  toPackId: string,
  updatedToPack: Partial<ToPack>
): Promise<ToPack> => {
  const response = await axiosInstance.put(
    `/${tripId}/trips/topacks/${toPackId}`,
    updatedToPack
  );
  return response.data;
};

export const deleteToPack = async (
  tripId: string,
  toPackId: string
): Promise<void> => {
  await axiosInstance.delete(`/${tripId}/trips/topacks/${toPackId}`);
};
