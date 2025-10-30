import React, { useState } from "react";

export default function BookingCard({ booking, onCancel, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: booking.name,
    email: booking.email,
    phone: booking.phone,
    date: booking.date,
    time: booking.time,
    doctor: booking.doctor,
  });

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div
      style={{
        padding: "1rem",
        borderRadius: "6px",
        border: "1px solid #e2e8f0",
        background: "#f8fafc",
        marginBottom: "0.5rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "0.5rem",
        }}
      >
        <div>
          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: "600",
              color: "#334155",
            }}
          >
            {form.doctor}
          </h3>
          <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
            {formatDate(form.date)} at {form.time}
          </p>
        </div>
        <span
          style={{
            background: "#dbeafe",
            color: "#2563eb",
            padding: "0.25rem 0.75rem",
            borderRadius: "9999px",
            fontSize: "0.875rem",
          }}
        >
          Confirmed
        </span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginTop: "0.75rem",
          padding: "0.75rem",
          background: "white",
          borderRadius: "4px",
        }}
      >
        <div>
          <p style={{ fontSize: "0.875rem", color: "#64748b" }}>Patient</p>
          {editing ? (
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={{ width: "100%" }}
            />
          ) : (
            <p style={{ color: "#334155" }}>{form.name}</p>
          )}
        </div>
        <div>
          <p style={{ fontSize: "0.875rem", color: "#64748b" }}>Contact</p>
          {editing ? (
            <>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={{ width: "100%" }}
              />
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                style={{ width: "100%", marginTop: "0.25rem" }}
              />
            </>
          ) : (
            <>
              <p style={{ color: "#334155" }}>{form.email}</p>
              <p style={{ color: "#334155" }}>{form.phone}</p>
            </>
          )}
        </div>
        <div>
          <p style={{ fontSize: "0.875rem", color: "#64748b" }}>Date & Time</p>
          {editing ? (
            <>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                style={{ width: "100%" }}
              />
              <input
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                style={{ width: "100%", marginTop: "0.25rem" }}
              />
            </>
          ) : (
            <p style={{ color: "#334155" }}>{form.date} {form.time}</p>
          )}
        </div>
      </div>
      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        {editing ? (
          <>
            <button
              style={{ background: "#6366f1", color: "white", border: "none", borderRadius: "4px", padding: "0.5rem 1rem" }}
              onClick={() => {
                onEdit(form);
                setEditing(false);
              }}
            >
              Save
            </button>
            <button
              style={{ background: "#e2e8f0", color: "#334155", border: "none", borderRadius: "4px", padding: "0.5rem 1rem" }}
              onClick={() => {
                setForm({
                  name: booking.name,
                  email: booking.email,
                  phone: booking.phone,
                  date: booking.date,
                  time: booking.time,
                  doctor: booking.doctor,
                });
                setEditing(false);
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              style={{ background: "#ef4444", color: "white", border: "none", borderRadius: "4px", padding: "0.5rem 1rem" }}
              onClick={onCancel}
            >
              Cancel Booking
            </button>
            <button
              style={{ background: "#6366f1", color: "white", border: "none", borderRadius: "4px", padding: "0.5rem 1rem" }}
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
}