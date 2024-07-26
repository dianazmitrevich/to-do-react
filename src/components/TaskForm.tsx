import React, { useState } from "react";

interface TaskFormProps {
    onAddTask: (taskName: string, taskDesc: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
    const [taskName, setTaskName] = useState<string>("");
    const [taskDesc, setTaskDesc] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (taskName.trim() && taskDesc.trim()) {
            onAddTask(taskName, taskDesc);
            setTaskName("");
            setTaskDesc("");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder="New task" />
            <input
                type="text"
                value={taskDesc}
                onChange={(e) => setTaskDesc(e.target.value)}
                placeholder="Description"
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;
