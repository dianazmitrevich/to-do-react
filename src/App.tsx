import React from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import "./assets/css/style.css";

const App: React.FC = () => {
    const handleAddTask = (taskName: string) => {
        console.log("Task to add:", taskName);
    };

    return (
        <div className="App">
            <div className="container">
                <h1>Todo App</h1>
                <TaskList />
            </div>
        </div>
    );
};

export default App;
