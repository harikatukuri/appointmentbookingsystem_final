import "../App.css"
import { Link } from "react-router-dom";
import { ArrowUpRight } from 'lucide-react';
export default function Main() {
  return (
    <main className="main-content">
      <section className="hero" id="home">
        <div className="hero-container">
          <h1>Book Appointment With Trusted Doctors</h1>
          <p>
            Simply browse through our extensive list of trusted doctors,
            schedule your appointment hassle-free.
          </p>
          <div className="hero-buttons">
            <a href="#doctors" className="btn-primary">
              Book Appointment
            </a>
            <Link to="/about" className="btn-secondary" style={{ display: "flex", alignItems: "center" , justifyContent: "center",  gap: "0.5rem" }}>
              Learn More <ArrowUpRight />
            </Link>
          </div>
        </div>
      </section>

      <section className="doctors" id="doctors">
        <div className="doctors-container">
          <h2>Top Doctors to Book</h2>
          <p className="doctors-subtitle">
            Simply browse through our extensive list of trusted doctors.
          </p>

          <div className="doctors-grid">
            <div className="doctor-card">
              <div className="doctor-image">SJ</div>
              <div className="doctor-info">
                <div className="doctor-name">Dr. Sarah Johnson</div>
                <div className="doctor-specialty">Cardiologist</div>
                <div className="doctor-experience">15 years experience</div>
                <div className="doctor-rating">
                  <span className="stars">★★★★★</span>
                  <span className="rating-text">4.9 (127 reviews)</span>
                </div>
                <span className="availability">Available</span>
                <button className="book-appointment-btn">Book Appointment</button>
              </div>
            </div>

            <div className="doctor-card">
              <div className="doctor-image">MC</div>
              <div className="doctor-info">
                <div className="doctor-name">Dr. Michael Chen</div>
                <div className="doctor-specialty">Neurologist</div>
                <div className="doctor-experience">12 years experience</div>
                <div className="doctor-rating">
                  <span className="stars">★★★★★</span>
                  <span className="rating-text">4.8 (89 reviews)</span>
                </div>
                <span className="availability">Available</span>
                <button className="book-appointment-btn">Book Appointment</button>
              </div>
            </div>

            <div className="doctor-card">
              <div className="doctor-image">ER</div>
              <div className="doctor-info">
                <div className="doctor-name">Dr. Emily Rodriguez</div>
                <div className="doctor-specialty">Pediatrician</div>
                <div className="doctor-experience">8 years experience</div>
                <div className="doctor-rating">
                  <span className="stars">★★★★★</span>
                  <span className="rating-text">4.9 (156 reviews)</span>
                </div>
                <span className="availability">Available</span>
                <button className="book-appointment-btn">Book Appointment</button>
              </div>
            </div>

            <div className="doctor-card">
              <div className="doctor-image">JW</div>
              <div className="doctor-info">
                <div className="doctor-name">Dr. James Wilson</div>
                <div className="doctor-specialty">Orthopedic Surgeon</div>
                <div className="doctor-experience">20 years experience</div>
                <div className="doctor-rating">
                  <span className="stars">★★★★☆</span>
                  <span className="rating-text">4.7 (203 reviews)</span>
                </div>
                <span className="availability busy">Busy</span>
                <button className="book-appointment-btn" disabled>
                  Book Appointment
                </button>
              </div>
            </div>

            <div className="doctor-card">
              <div className="doctor-image">LT</div>
              <div className="doctor-info">
                <div className="doctor-name">Dr. Lisa Thompson</div>
                <div className="doctor-specialty">Dermatologist</div>
                <div className="doctor-experience">10 years experience</div>
                <div className="doctor-rating">
                  <span className="stars">★★★★★</span>
                  <span className="rating-text">4.8 (94 reviews)</span>
                </div>
                <span className="availability">Available</span>
                <button className="book-appointment-btn">Book Appointment</button>
              </div>
            </div>

            <div className="doctor-card">
              <div className="doctor-image">RK</div>
              <div className="doctor-info">
                <div className="doctor-name">Dr. Robert Kumar</div>
                <div className="doctor-specialty">General Physician</div>
                <div className="doctor-experience">18 years experience</div>
                <div className="doctor-rating">
                  <span className="stars">★★★★★</span>
                  <span className="rating-text">4.9 (178 reviews)</span>
                </div>
                <span className="availability">Available</span>
                <button className="book-appointment-btn">Book Appointment</button>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link to="/doctors" className="view-all-btn">
              View All Doctors →
            </Link>
          </div>
        </div>
      </section>

      <section className="features" id="about">
        <div className="features-container">
          <h2>Why Choose CareConnect?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">👨‍⚕️</div>
              <h3>Qualified Doctors</h3>
              <p>
                Access to a network of experienced and certified medical
                professionals across various specialties.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3>Easy Scheduling</h3>
              <p>
                Book appointments at your convenience with our user-friendly
                scheduling system.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Private</h3>
              <p>
                Your medical information is protected with industry-standard
                security measures.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
