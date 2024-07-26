import axios from "axios";
import { Task } from "../models/Task";

const API_URL = "http://localhost:5001/tasks";

export const fetchTasks = async (): Promise<Task[]> => {
    try {
        const response = await axios.get<Task[]>(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
};

export const addTask = async (task: Omit<Task, "_id">): Promise<Task> => {
    try {
        const response = await axios.post<Task>(API_URL, task);
        return response.data;
    } catch (error) {
        console.error("Error adding task:", error);
        throw error;
    }
};

export const updateTask = async (task: Task) => {
    try {
        const url = `${API_URL}/${task._id}`;
        const response = await axios.put(url, task);
        return response.data;
    } catch (error) {
        console.error("Error updating task:", error);
        throw error;
    }
};

export const deleteTask = async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};
