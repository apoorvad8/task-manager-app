import React, { useState } from "react";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", { email, password });
      const token = response.data.token;

      // Store the JWT token in localStorage
      localStorage.setItem("token", token);

      // Call the onLogin callback and navigate to the TaskPage
      onLogin();
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
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
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        {error && (
          <Typography color="error" align="center" gutterBottom>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              marginTop: 2,
              backgroundColor: "#5c6bc0",
              "&:hover": { backgroundColor: "#3949ab" },
            }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;