import express from "express";
import Task from "../models/Task";

const router = express.Router();

// Получение всех задач
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// Получение одной задачи по ID
router.get("/:id", async (req, res) => {
    try {
        // Находим задачу по ID
        const task = await Task.findById(req.params.id);

        // Если задача не найдена, возвращаем ошибку 404
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Возвращаем найденную задачу
        res.json(task);
    } catch (err) {
        // Возвращаем ошибку 500 в случае исключения
        res.status(500).json({ message: err });
    }
});

// Добавление новой задачи
router.post("/", async (req, res) => {
    const task = new Task(req.body);
    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

// Обновление задачи
router.put("/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// Удаление задачи
router.delete("/:id", async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted" });
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

export default router;
