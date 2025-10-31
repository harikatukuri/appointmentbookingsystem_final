import React, { useEffect, useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  console.log(username);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      try {
        // decode basic payload without verifying (split by . and base64)
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUsername(payload.name || "User");
      } catch {
        setUsername("User");
      }
    } else {
      setIsLoggedIn(false);
      setUsername("");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUsername("");
    navigate('/');
  };

  return (
    <header className="header">
      <div className="nav-container">
        <a href="/" className="logo">
          <div className="logo-icon">🏠</div>
          CareConnect
        </a>
        <nav>
          <ul className="nav-menu">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/doctors">Doctors</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
        <div style={{ display: "flex", gap: "1rem" ,justifyContent: "center", alignItems: "center"}}>
          {isLoggedIn ? (
            <>
              <Link to="/profile">
                <p style={{ color: "#333", textDecoration: "none" }}>My Dashboard</p>
              </Link>
              <button className="create-account-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <p style={{ color: "#333", textDecoration: "none" }}>Login</p>
              </Link>
              <Link to="/register">
                <button className="create-account-btn">Create account</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
