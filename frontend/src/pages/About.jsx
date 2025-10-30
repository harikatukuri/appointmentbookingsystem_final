import "../App.css";
export default function About() {
  return (
    <section className="about-page">
      <div className="container">
        <h2>About Our Healthcare</h2>
        <p className="about-subtitle">Caring for you, every step of the way</p>

        <div className="about-content">
          <p>
            Welcome to <strong>HealthCare</strong>, your trusted partner in
            health and well-being. We are committed to providing compassionate,
            patient-centered medical care with a focus on quality, safety, and
            innovation. Our team of experienced doctors, nurses, and staff work
            tirelessly to ensure that every patient receives the highest level
            of care.
          </p>

          <p>
            Established in 2005, we have grown into a multi-specialty healthcare
            facility with world-class infrastructure, advanced medical
            technology, and a commitment to excellence. Whether it's preventive
            care, diagnostics, or specialized treatments, we are here for you.
          </p>
        </div>

        <div className="about-highlights">
          <div className="highlight-card">
            <h3>🌍 Our Mission</h3>
            <p>
              To make quality healthcare accessible and affordable for everyone.
            </p>
          </div>
          <div className="highlight-card">
            <h3>💡 Our Vision</h3>
            <p>
              To be a global leader in patient-centered healthcare and medical
              innovation.
            </p>
          </div>
          <div className="highlight-card">
            <h3>🤝 Our Values</h3>
            <p>
              Compassion, Integrity, Innovation, Excellence, and Patient First.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
