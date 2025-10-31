import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const navigate = useNavigate();
  const [username, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleuserNameChange = (e) => setuserName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("https://bookingsystembackend.vercel.app/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || `Login failed (${res.status})`);
      }

      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        // simple feedback; you can replace with navigation
        alert("Login successful");
        navigate('/');
      } else {
        throw new Error("No token returned from server");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        width: "100vw",
        color: "#333",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "400px",
          gap: "1rem",
          background: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Login</p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            width: "100%",
          }}
        >
          <label htmlFor="username">username</label>
          <input
            type="username"
            id="username"
            value={username}
            onChange={handleuserNameChange}
            style={{
              padding: "0.50rem 0.25rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
              outline: "none",
              background: "#ddd",
              color: "#333",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            width: "100%",
          }}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            style={{
              padding: "0.50rem 0.25rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
              outline: "none",
              background: "#ddd",
              color: "#333",
            }}
          />
        </div>
        {error && (
          <div style={{ color: "#b91c1c", marginBottom: "0.5rem" }}>
            {error}
          </div>
        )}
        <button
          style={{
            padding: "10px",
            borderRadius: "25px",
            border: "1px solid #ccc",
            outline: "none",
            background: "#6366f1",
            color: "white",
            cursor: "pointer",
            width: "150px",
            fontSize: "1rem",
            fontWeight: "500",
            hover: { background: "#4f46e5" },
          }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
