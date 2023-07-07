import { AxiosInstance } from "./axiosInstance";

export const getTask = () => {
    return AxiosInstance.get('/todos/1/items')
};
export const postTask = (newTask) => {
    return AxiosInstance.post('/todos/1/items', newTask)
};
