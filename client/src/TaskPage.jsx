import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      }
    };

    fetchTasks();
  }, []);

  const handleAdd = async () => {
    if (input.trim()) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:5000/tasks",
          { text: input.trim() },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTasks([...tasks, response.data]);
        setInput("");
      } catch (err) {
        console.error("Failed to add task", err);
      }
    }
  };

  const handleToggle = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:5000/tasks/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (err) {
      console.error("Failed to toggle task", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #f0f2f5, #dce3ec)",
        overflow: "auto",
      }}
    >
      <Box
        component={Paper}
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 600,
          margin: 2,
          padding: 4,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#333",
            textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
          }}
        >
          📝 Task Manager
        </Typography>
        <Box display="flex" gap={2} mb={3}>
          <TextField
            fullWidth
            label="Add a new task"
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <Button
            onClick={handleAdd}
            variant="contained"
            sx={{
              backgroundColor: "#5c6bc0",
              "&:hover": { backgroundColor: "#3949ab" },
            }}
            startIcon={<AddIcon />}
          >
            Add
          </Button>
        </Box>

        <List>
          {tasks.map((task) => (
            <ListItem
              key={task.id}
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: 1,
                mb: 1,
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
              secondaryAction={
                <IconButton
                  edge="end"
                  onClick={() => handleDelete(task.id)}
                  sx={{ color: "#e53935" }}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <Checkbox
                edge="start"
                checked={task.completed}
                onChange={() => handleToggle(task.id)}
                sx={{ color: "#5c6bc0" }}
              />
              <ListItemText
                primary={task.text}
                primaryTypographyProps={{
                  style: {
                    textDecoration: task.completed ? "line-through" : "none",
                    color: task.completed ? "#9e9e9e" : "#333",
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default TaskPage;