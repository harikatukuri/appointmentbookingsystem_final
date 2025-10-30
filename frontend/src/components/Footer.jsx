import "../App.css";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="logo">
              <div className="logo-icon">🏠</div>
              CareConnect
            </div>
            <p>Connects patients with doctors and services quickly.</p>
          </div>
          <div className="footer-section">
            <h3>COMPANY</h3>
            <a href="#home">Home</a>
            <a href="#about">About us</a>
            <a href="#delivery">Delivery</a>
            <a href="#privacy">Privacy policy</a>
          </div>
          <div className="footer-section">
            <h3>GET IN TOUCH</h3>
            <p>+0-000-000-000</p>
            <p>exampleav@gmail.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            Copyright &copy;
            <span id="year">{new Date().getFullYear()}</span>- All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
