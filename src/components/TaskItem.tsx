import React from "react";

interface TaskItemProps {
    task: { _id: string; title: string };
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    return <li>{task.title}</li>;
};

export default TaskItem;
