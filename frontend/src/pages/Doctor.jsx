import { useEffect, useState } from "react";
import DoctorCard from "../components/DoctorCard";
import { doctorsData as initialDoctors } from "../data/data.js";
import { useNavigate } from 'react-router-dom';
export default function Doctor() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  // initialize with local data so the page works even if backend is down
  const [doctorsData, setDoctorData] = useState(initialDoctors || []);
  const [loading, setLoading] = useState(false);
const [showDialog, setShowDialog] = useState(false);
const [selectedDoctor, setSelectedDoctor] = useState(null);
const [selectedSpecialty, setSelectedSpecialty] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch("https://bookingsystembackend.vercel.app/doctors")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        if (!mounted) return;
        if (Array.isArray(data) && data.length) setDoctorData(data);
        else setDoctorData(initialDoctors || []);
      })
      .catch((err) => {
        // fallback to bundled data when fetch fails
        console.error("Failed to fetch doctors, using local data:", err);
        if (mounted) setDoctorData(initialDoctors || []);
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);


  const [formData, setFormData] = useState({
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    patientDate: "",
    patientTime: "",
  });

  const specialties = [...new Set((doctorsData || []).map((doctor) => doctor.specialty))];

  const filteredDoctors = doctorsData.filter((doctor) => {
    const nameMatch = doctor.name.toLowerCase().includes(search.toLowerCase());
    const specialtyMatch = doctor.specialty.toLowerCase().includes(search.toLowerCase());

    const matchesSearch = nameMatch || specialtyMatch;
    const matchesDropdown = selectedSpecialty ? doctor.specialty === selectedSpecialty : true;

    return matchesSearch && matchesDropdown;
  });

  const openBookingDialog = (doctorName) => {
    const token = localStorage.getItem("token");
    if (!token) {
      // redirect to login if not authenticated
      navigate("/login");
      return;
    }

    setSelectedDoctor(doctorName);
    setFormData({
      patientName: "",
      patientEmail: "",
      patientPhone: "",
      patientDate: "",
      patientTime: "",
    });
    setShowDialog(true);
  };

  const closeBookingDialog = () => {
    setShowDialog(false);
    setSelectedDoctor(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to book an appointment.");
      navigate("/login");
      return;
    }

    try {
      const payload = {
        name: formData.patientName,
        email: formData.patientEmail,
        phone: formData.patientPhone,
        date: formData.patientDate,
        time: formData.patientTime,
        doctor: selectedDoctor,
      };

      const res = await fetch("https://bookingsystembackend.vercel.app/booking/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || `Booking failed (${res.status})`);
      }

      const data = await res.json();
      alert(data.message || "Appointment booked successfully!");
      closeBookingDialog();
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to create booking");
    }
  };

  return (
    <main className="main-content doctors-page">
      <section className="doctors">
        <div className="doctors-container">
          <h2>Our Doctors</h2>
          <p className="doctors-subtitle">
            Find and book appointments with our trusted specialists.
          </p>

          <div className="doctor-search" style={{ display: "flex", gap: "1rem" }}>
            <input
              type="text"
              placeholder="Search by name or specialty..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              style={{
                width: "150px",
                padding: "0.5rem",
                borderRadius: "5px",
                background: "#ddd",
                color: "#333",
              }}
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              <option value="">All Specialties</option>
              {specialties.map((specialty, index) => (
                <option key={index} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>

          <div className="doctors-grid">
            {loading ? (
              <div className="loading">Loading doctors...</div>
            ) : filteredDoctors.length ? (
              filteredDoctors.map((doc) => (
                <DoctorCard key={doc.name} doctor={doc} onBook={openBookingDialog} />
              ))
            ) : (
              <div className="no-results">No doctors found.</div>
            )}
          </div>
        </div>
      </section>

      {showDialog && (
        <div id="bookingDialog" style={{ display: "flex" }}>
          <div className="dialogContent">
            <h2>Booking Appointment</h2>
            <p>
              Doctor: <span id="bookingDoctorName">{selectedDoctor}</span>
            </p>
            <form id="bookingDialogForm" onSubmit={handleSubmit}>
              <label htmlFor="patientName">Patient Name:</label>
              <input
                type="text"
                id="patientName"
                name="patientName"
                required
                value={formData.patientName}
                placeholder="Patient Name"
                onChange={(e) =>
                  setFormData({ ...formData, patientName: e.target.value })
                }
              />

              <label htmlFor="patientEmail">Email:</label>
              <input
                type="email"
                id="patientEmail"
                name="patientEmail"
                required
                placeholder="Patient Email"
                value={formData.patientEmail}
                onChange={(e) =>
                  setFormData({ ...formData, patientEmail: e.target.value })
                }
              />

              <label htmlFor="patientPhone">Phone:</label>
              <input
                type="tel"
                id="patientPhone"
                name="patientPhone"
                required
                placeholder="Patient Phone"
                value={formData.patientPhone}
                onChange={(e) =>
                  setFormData({ ...formData, patientPhone: e.target.value })
                }
              />

              <label htmlFor="patientDate">Preferred Date:</label>
              <input
                type="date"
                id="patientDate"
                name="patientDate"
                required
                value={formData.patientDate}
                onChange={(e) =>
                  setFormData({ ...formData, patientDate: e.target.value })
                }
              />

              <label htmlFor="patientTime">Preferred Time:</label>
              <input
                type="time"
                id="patientTime"
                name="patientTime"
                required
                value={formData.patientTime}
                onChange={(e) =>
                  setFormData({ ...formData, patientTime: e.target.value })
                }
              />

              <div className="dialogActions">
                <button type="submit" className="submitBtn">
                  Book
                </button>
                <button
                  type="button"
                  id="closeBookingDialog"
                  className="cancelBtn"
                  onClick={closeBookingDialog}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
