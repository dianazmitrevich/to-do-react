import React, { useState } from "react";

interface TaskFormProps {
    onAddTask: (taskName: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
    const [taskName, setTaskName] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (taskName.trim()) {
            onAddTask(taskName);
            setTaskName("");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder="New task" />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;
