import React, { useState } from "react";
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // call backend register endpoint
    (async () => {
      try {
        const res = await fetch("https://bookingsystembackend.vercel.app/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // backend expects { username, password }
          body: JSON.stringify({ username: email || name, password }),
        });

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.message || `Register failed (${res.status})`);
        }

        alert("Registration successful. Please login.");
        window.location.href = "/login";
      } catch (err) {
        console.error(err);
        alert(err.message || "Registration failed");
      }
    })();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        width: "100vw",
        marginTop: "30px",
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            width: "100%",
          }}
        >
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            width: "100%",
          }}
        >
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
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
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
    </div>
  );
}
