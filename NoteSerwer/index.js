import express, { json } from "express";
import { createTask, getTasks, getById, updateTask } from "./app/dbcontroller.js"

const app = express()
const PORT = 3000;
app.use(json())

app.get("/api/task", async (req, res) => {
    console.log("get");
    const tasks = await getTasks();
    res.status(200).json(tasks);
})

app.listen(PORT, () => {
    console.log("start")
})