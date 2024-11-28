import axiosInstance from "../services/axiosInstances";

interface NewToDo {
    id?: string; 
    text: string;
    done: boolean;
}

export const getToDosByTrip = async (tripId: string): Promise<NewToDo[]> => {
    const response = await axiosInstance.get(`/trips/${tripId}/todos`);
    return response.data;
};

export const createToDo = async (tripId: string, toDo: Partial<NewToDo>): Promise<NewToDo> => {
    const response = await axiosInstance.post(`/trips/${tripId}/todos`, toDo);
    return response.data;
};

export const updateToDo = async (
    tripId: string,
    toDoId: string,
    updatedToDo: Partial<NewToDo>
): Promise<NewToDo> => {
    const response = await axiosInstance.put(`/trips/${tripId}/todos/${toDoId}`, updatedToDo);
    return response.data;
};

export const deleteToDo = async (tripId: string, toDoId: string): Promise<void> => {
    await axiosInstance.delete(`/trips/${tripId}/todos/${toDoId}`);
};
