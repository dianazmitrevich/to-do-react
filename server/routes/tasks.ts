import express from "express";
import Task from "../models/Task";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        const error = err as Error;
        res.status(500).json({ message: error.message });
    }
});

router.post("/", async (req, res) => {
    const task = new Task(req.body);
    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        const error = err as Error;
        res.status(400).json({ message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted" });
    } catch (err) {
        const error = err as Error;
        res.status(500).json({ message: error.message });
    }
});

export default router;
