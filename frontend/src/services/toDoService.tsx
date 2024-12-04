import axiosInstance from "../services/axiosInstances";

interface NewToDo {
id?: string;
text: string;
done: boolean;
}

export const getToDosByTrip = async (tripId: string): Promise<NewToDo[]> => {
const response = await axiosInstance.get(`/${tripId}/todos`);
return response.data;
};

export const createToDo = async (
tripId: string,
toDo: Partial<NewToDo>
): Promise<NewToDo> => {
const response = await axiosInstance.post(`/${tripId}/todos`, toDo);
return response.data;
};

export const updateToDo = async (
tripId: string,
toDoId: string,
updatedToDo: Partial<NewToDo>
): Promise<NewToDo> => {
const response = await axiosInstance.put(`/${tripId}/todos/${toDoId}`, updatedToDo);
return response.data;
};

export const deleteToDo = async (
    tripId: string,
    toDoId: string
): Promise<void> => {
    await axiosInstance.delete(`/${tripId}/todos/${toDoId}`);
};
