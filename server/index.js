const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 5000;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const DATA_PATH = './data/tasks.json';

app.use(cors());
app.use(express.json());

const readTasks = () => JSON.parse(fs.readFileSync(DATA_PATH));
const writeTasks = (data) => fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

// Mock function to validate user credentials
const validateUser = (email, password) => {
  const users = JSON.parse(fs.readFileSync(DATA_PATH));
  return users.find((user) => user.email === email && user.password === password);
};


// Login endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = validateUser(email, password);
  if (!user) {
    return res.status(401).json({ msg: "Invalid email or password" });
  }

  // Generate JWT token
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
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
