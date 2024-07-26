import React, { useEffect, useState } from "react";
import { fetchTasks, addTask } from "../services/TaskService";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import { Task } from "../models/Task";
import { updateTask, deleteTask } from "../services/TaskService";

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

    const handleAddTask = async (taskTitle: string, taskDesc: string) => {
        try {
            const newTask: Omit<Task, "_id"> = {
                title: taskTitle,
                description: taskDesc,
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

    const handleDeleteTask = (id: string) => {
        setTasks(tasks.filter((task) => task._id !== id));
    };

    const handleToggleComplete = async (task: Task) => {
        try {
            const updatedTask = { ...task, completed: !task.completed };
            await updateTask(updatedTask);
            setTasks(tasks.map((t) => (t._id === task._id ? updatedTask : t)));
        } catch (error) {
            console.error("Failed to update task status:", error);
        }
    };

    return (
        <div>
            <TaskForm onAddTask={handleAddTask} />
            {error && <p>{error}</p>}
            <div className="tasks__list">
                {tasks.map((task) => (
                    <TaskItem
                        key={task._id}
                        task={task}
                        onToggleComplete={handleToggleComplete}
                        onDelete={handleDeleteTask}
                    />
                ))}
            </div>
        </div>
    );
};

export default TaskList;
