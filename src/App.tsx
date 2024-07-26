import React from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

const App: React.FC = () => {
    const handleAddTask = (taskName: string) => {
        console.log("Task to add:", taskName);
    };

    return (
        <div className="App">
            <h1>To-Do List</h1>
            <TaskList />
        </div>
    );
};

export default App;
