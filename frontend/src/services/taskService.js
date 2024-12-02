import axios from 'axios';

const API_URL = 'http://localhost:8080/api/tasks';

export const getAllTasks = () => {
    return axios.get(API_URL);
};

export const getTaskById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

export const createTask = (taskData) => {
    return axios.post(API_URL, taskData);
};

export const updateTask = (id, taskData) => {
    return axios.put(`${API_URL}/${id}`, taskData);
};

export const deleteTask = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};
