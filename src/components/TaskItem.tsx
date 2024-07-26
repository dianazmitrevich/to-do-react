import React, { useState } from "react";
import { Task } from "../models/Task";
import { updateTask, deleteTask } from "../services/TaskService";

const EditTaskModal: React.FC<{ task: Task; onClose: () => void; onSave: (updatedTask: Task) => void }> = ({
    task,
    onClose,
    onSave,
}) => {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);

    const handleSave = () => {
        const updatedTask = { ...task, title, description };
        onSave(updatedTask);
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal__content">
                <h2>Edit Task</h2>
                <label>
                    Title:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <label>
                    Description:
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <button onClick={handleSave}>Save</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

interface TaskItemProps {
    task: Task;
    onToggleComplete: (task: Task) => void;
    onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteTask(task._id);
            onDelete(task._id);
        } catch (error) {
            console.error("Failed to delete task:", error);
        }
    };

    const handleSave = async (updatedTask: Task) => {
        try {
            await updateTask(updatedTask);
            onToggleComplete(updatedTask);
        } catch (error) {
            console.error("Failed to update task:", error);
        }
    };

    return (
        <div className="list__item item">
            <div className="item__name">{task.title}</div>
            <div className="item__desc">{task.description}</div>
            <button onClick={() => onToggleComplete(task)}>
                {task.completed ? "Mark as Incomplete" : "Mark as Complete"}
            </button>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={() => setIsModalOpen(true)}>Edit</button>
            {isModalOpen && <EditTaskModal task={task} onClose={() => setIsModalOpen(false)} onSave={handleSave} />}
        </div>
    );
};

export default TaskItem;
