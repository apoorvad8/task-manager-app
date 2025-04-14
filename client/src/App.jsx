import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import TaskPage from "./TaskPage";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Protected route for TaskPage */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <TaskPage />
            </ProtectedRoute>
          }
        />
        {/* Public route for Login */}
        <Route path="/login" element={<Login onLogin={() => console.log("Logged in")} />} />
      </Routes>
    </Router>
  );
}

export default App;