import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookingCard from "../components/BookingCard";
export default function Profile() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Decode token to get user info
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserData(payload);
    } catch {
      setUserData({ name: "User" });
    }

    const fetchBookings = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://bookingsystembackend.vercel.app/auth/profile/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          if (res.status === 401) {
            localStorage.removeItem("token");
            navigate("/login");
            return;
          }
          throw new Error("Failed to fetch bookings");
        }

        const data = await res.json();
        setBookings(data.bookings || []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Error fetching bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  return (
    <main
      className="profile-page"
      style={{
            padding: "8rem",
    margin: "0px auto",
    background: "rgb(248, 250, 252)",
    height: "fit-content",
    width: "100vw"
      }}
    >
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#1e293b" }}>
          My Dashboard
        </h1>
        {userData && (
          <p style={{ color: "#64748b", marginTop: "0.5rem" }}>
            Welcome back, {userData.name}!
          </p>
        )}
      </div>

      <div
        style={{
          background: "white",
          borderRadius: "8px",
          padding: "1.5rem",
          width: "80%",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          style={{ fontSize: "1.5rem", color: "#334155", marginBottom: "1rem" }}
        >
          My Appointments
        </h2>

        {loading ? (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <p>Loading your appointments...</p>
          </div>
        ) : error ? (
          <div
            style={{
              padding: "1rem",
              background: "#fee2e2",
              color: "#b91c1c",
              borderRadius: "4px",
            }}
          >
            {error}
          </div>
        ) : bookings.length ? (
          <div style={{ display: "grid", gap: "1rem" }}>
            {bookings.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                onCancel={async () => {
                  const token = localStorage.getItem("token");
                  if (!window.confirm("Are you sure you want to cancel this booking?")) return;
                  try {
                    const res = await fetch(`https://bookingsystembackend.vercel.app/booking/${booking._id}`, {
                      method: "DELETE",
                      headers: { Authorization: `Bearer ${token}` },
                    });
                    if (!res.ok) throw new Error("Failed to cancel booking");
                    setBookings((prev) => prev.filter((b) => b._id !== booking._id));
                  } catch (err) {
                    alert(err.message || "Error cancelling booking");
                  }
                }}
                onEdit={async (updated) => {
                  const token = localStorage.getItem("token");
                  try {
                    const res = await fetch(`https://bookingsystembackend.vercel.app/booking/${booking._id}`, {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                      body: JSON.stringify(updated),
                    });
                    if (!res.ok) throw new Error("Failed to update booking");
                    const data = await res.json();
                    setBookings((prev) => prev.map((b) => b._id === booking._id ? data.booking : b));
                  } catch (err) {
                    alert(err.message || "Error updating booking");
                  }
                }}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "3rem 1rem",
              color: "#64748b",
              background: "#f8fafc",
              borderRadius: "6px",
              border: "1px dashed #cbd5e1",
            }}
          >
            <p>You don't have any appointments yet.</p>
            <button
              onClick={() => navigate("/doctors")}
              style={{
                marginTop: "1rem",
                padding: "0.5rem 1rem",
                background: "#6366f1",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Book an Appointment
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
