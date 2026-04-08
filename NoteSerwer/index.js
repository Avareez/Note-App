import express, { json } from "express";
import { getBackups, createBackup, deleteBackup } from "./app/dbcontroller.js"

const app = express();
const PORT = 3000;
app.use(json());

app.get("/api/backup", async (req, res) => {
    const backups = await getBackups();
    res.status(200).json(backups);
})

app.post("/api/backup", async (req, res) => {
    const { notes } = req.body;
    const result = await createBackup(notes);
    res.status(201).json(result);
})

app.delete("/api/backup/:id", async (req, res) => {
    const { id } = req.params;
    const result = await deleteBackup(id);
    res.status(200).json(result);
})

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
})