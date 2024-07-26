import React, { createContext, useReducer, ReactNode } from "react";
import { Task } from "../models/Task";

type TaskAction =
    | { type: "ADD_TASK"; task: Task }
    | { type: "REMOVE_TASK"; id: string }
    | { type: "EDIT_TASK"; task: Task }
    | { type: "TOGGLE_TASK"; id: string };

type TaskState = {
    tasks: Task[];
};

const initialState: TaskState = {
    tasks: [],
};

const TaskContext = createContext<{
    state: TaskState;
    dispatch: React.Dispatch<TaskAction>;
}>({
    state: initialState,
    dispatch: () => null,
});

const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
    switch (action.type) {
        case "ADD_TASK":
            return { ...state, tasks: [...state.tasks, action.task] };
        case "REMOVE_TASK":
            return { ...state, tasks: state.tasks.filter((task) => task._id !== action.id) };
        case "EDIT_TASK":
            return {
                ...state,
                tasks: state.tasks.map((task) => (task._id === action.task._id ? action.task : task)),
            };
        case "TOGGLE_TASK":
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task._id === action.id ? { ...task, completed: !task.completed } : task
                ),
            };
        default:
            return state;
    }
};

const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(taskReducer, initialState);

    return <TaskContext.Provider value={{ state, dispatch }}>{children}</TaskContext.Provider>;
};

export { TaskContext, TaskProvider };
