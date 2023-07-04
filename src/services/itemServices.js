import { AxiosInstance } from "./axiosInstance";

export const getItem = () => {
    return AxiosInstance.get('/todos');
};
