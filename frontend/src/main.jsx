import "./index.css";
import App from "./App.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import About from "./pages/About.jsx";
import Doctor from "./pages/Doctor.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<About />} />
      <Route path="/doctors" element={<Doctor />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route
        path="*"
        element={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "80vh",
              width: "100vw",
              color: "#333",
              background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)"
            }}
          >
            <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Page Not Found 404</h1>
          </div>
        }
      />
    </Routes>
    <Footer />
  </BrowserRouter>
);
