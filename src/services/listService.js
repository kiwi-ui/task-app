import { AxiosInstance } from "./axiosInstance";

export const getList = () => {
    return AxiosInstance.get('/todos/1/items')
};
