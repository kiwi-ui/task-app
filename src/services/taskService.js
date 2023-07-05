import { AxiosInstance } from "./axiosInstance";

export const getTask = () => {
    return AxiosInstance.get('/todos/1/items')
};
