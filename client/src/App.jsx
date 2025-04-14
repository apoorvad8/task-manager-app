import React, { useState } from "react";
import {
  Container,
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

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now(), text: input.trim(), completed: false },
      ]);
      setInput("");
    }
  };

  const handleToggle = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right,  #f0f2f5, #dce3ec)",
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
            textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
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
              backgroundColor: "#6a11cb",
              "&:hover": { backgroundColor: "#2575fc" },
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
                backgroundColor: "#f9f9f9",
                borderRadius: 1,
                mb: 1,
                "&:hover": { backgroundColor: "#f1f1f1" },
              }}
              secondaryAction={
                <IconButton
                  edge="end"
                  onClick={() => handleDelete(task.id)}
                  sx={{ color: "#ff5252" }}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <Checkbox
                edge="start"
                checked={task.completed}
                onChange={() => handleToggle(task.id)}
                sx={{ color: "#6a11cb" }}
              />
              <ListItemText
                primary={task.text}
                primaryTypographyProps={{
                  style: {
                    textDecoration: task.completed ? "line-through" : "none",
                    color: task.completed ? "gray" : "inherit",
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default App;
