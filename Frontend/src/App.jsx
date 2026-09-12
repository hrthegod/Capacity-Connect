import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ================================
// PUBLIC PAGES
// ================================
import Landing from "./Pages/Landing/Landing";
import Register from "./Pages/Auth/Register/Register";
import Login from "./Pages/Auth/Login/Login";

// ================================
// LEARNER ROUTES
// ================================
import LearnerRoutes from "./routes/LearnerRoutes";

// ================================
// TRAINER ROUTES
// ================================
import TrainerRoutes from "./routes/TrainerRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ========================================
            PUBLIC PAGES
        ======================================== */}

        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Login Page */}
        <Route
          path="/login"
          element={
            <>
              <Landing />
              <Login />
            </>
          }
        />

        {/* Register Page */}
        <Route
          path="/register"
          element={
            <>
              <Landing />
              <Register />
            </>
          }
        />

        {/* ========================================
            LEARNER APPLICATION
        ======================================== */}

        <Route path="/learner/*" element={<LearnerRoutes />} />

        {/* ========================================
            TRAINER APPLICATION
        ======================================== */}

        <Route path="/trainer/*" element={<TrainerRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
