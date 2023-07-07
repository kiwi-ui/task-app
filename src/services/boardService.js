import { AxiosInstance } from "./axiosInstance";

export const getBoard = () => {
    return AxiosInstance.get('/todos');
};
export const postBoard = (newBoard) => {
    return AxiosInstance.post('/todos', newBoard);
};
