const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 5000;

const DATA_PATH = './data/tasks.json';

app.use(cors());
app.use(express.json());

const readTasks = () => JSON.parse(fs.readFileSync(DATA_PATH));
const writeTasks = (data) => fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

app.post('/login', (req, res) => {
  const { username } = req.body;
  // In production, use proper authentication
  res.json({ token: username });
});

app.get('/tasks', (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const tasks = readTasks();
  const newTask = { id: Date.now(), ...req.body, completed: false };
  tasks.push(newTask);
  writeTasks(tasks);
  res.json(newTask);
});

app.patch('/tasks/:id', (req, res) => {
  const tasks = readTasks();
  const task = tasks.find(t => t.id === Number(req.params.id));
  if (task) {
    task.completed = true;
    writeTasks(tasks);
    res.json(task);
  } else {
    res.status(404).send();
  }
});

app.delete('/tasks/:id', (req, res) => {
  let tasks = readTasks();
  tasks = tasks.filter(t => t.id !== Number(req.params.id));
  writeTasks(tasks);
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
