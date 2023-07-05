import { AxiosInstance } from "./axiosInstance";

export const getBoard = () => {
    return AxiosInstance.get('/todos');
};
