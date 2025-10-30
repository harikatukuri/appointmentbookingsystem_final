export default function DoctorCard({ doctor, onBook }) {
  return (
    <div className="doctor-card">
      <div className="doctor-image">{doctor.initials}</div>
      <div className="doctor-info">
        <div className="doctor-name">{doctor.name}</div>
        <div className="doctor-specialty">{doctor.specialty}</div>
        <div className="doctor-experience">{doctor.experience}</div>
        <span className={`availability ${doctor.availability === "Busy" ? "busy" : ""}`}>
          {doctor.availability}
        </span>
        <button
          className="book-appointment-btn"
          disabled={doctor.availability === "Busy"}
          onClick={() => onBook(doctor.name)}
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}