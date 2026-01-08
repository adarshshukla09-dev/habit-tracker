import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import { AuthProvider } from "./Context/UserContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import HomePage from "./pages/HomePage.jsx";

function App() {
  return (
    <AuthProvider>
      {/* Full-page background wrapper */}
      <div
        className="min-h-screen bg-cover bg-center"
        // style={{ backgroundImage: "url('/bg.jpg')" }}
      >
        {/* Optional overlay for better readability */}
        <div className="min-h-screen bg-black/30">
          <Routes>
            <Route
              path="/DashBoard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                // <ProtectedRoute>
                  <HomePage />
                // </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
