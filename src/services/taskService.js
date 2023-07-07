import { AxiosInstance } from "./axiosInstance";

export const getTask = () => {
    return AxiosInstance.get('/todos/1/items')
};
export const postTask = (newTask) => {
    return AxiosInstance.post('/todos/1/items', newTask)
};
export const deleteTask = (taskID) => {
    return AxiosInstance.delete(`todos/1/items/${ taskID }`)
}
