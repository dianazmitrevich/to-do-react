import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import taskRoutes from "../routes/tasks";

const app = express();
const PORT = 5001;

// Подключение к MongoDB
mongoose
    .connect("mongodb://localhost:27017/todolist")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(express.json());

// Роуты для задач
app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
