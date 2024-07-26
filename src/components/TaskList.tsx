import React, { useEffect, useState } from "react";
import { fetchTasks, addTask } from "../services/TaskService";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import { Task } from "../models/Task";

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchTasksData = async () => {
            try {
                const tasks = await fetchTasks();
                setTasks(tasks);
            } catch (error) {
                setError("Failed to fetch tasks.");
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasksData();
    }, []);

    const handleAddTask = async (taskTitle: string) => {
        try {
            const newTask: Omit<Task, "_id"> = {
                title: taskTitle,
                description: "",
                completed: false,
            };
            await addTask(newTask);
            const updatedTasks = await fetchTasks();
            setTasks(updatedTasks);
        } catch (error) {
            setError("Failed to add task.");
            console.error("Error adding task:", error);
        }
    };

    return (
        <div>
            <TaskForm onAddTask={handleAddTask} />
            {error && <p>{error}</p>}
            <ul>
                {tasks.map((task) => (
                    <TaskItem key={task._id} task={task} />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
