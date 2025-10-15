import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className=" border-top mt-5 pt-5">
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
          {/* Brand / About */}
          <div className="col mb-3">
            <a
              href="/"
              className="d-flex align-items-center mb-3 text-decoration-none"
            >
              <h4 className="fw-bold text-secondary">AutoHub.lt</h4>
            </a>
            <p className="text-muted mb-0">&copy; 2025 EuroHub UAB.</p>
          </div>

          {/* Section 1 */}
          <div className="col mb-3">
            <h5 className="fw-semibold">Links</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="/" className="nav-link p-0 text-muted">Home</a>
              </li>
              <li className="nav-item mb-2">
                <a href="/faqs" className="nav-link p-0 text-muted">FAQs</a>
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="col mb-3">
            <h5 className="fw-semibold">Support</h5>
            <ul className="nav flex-column">
              
              <li className="nav-item mb-2">
                <a href="/make-ticket" className="nav-link p-0 text-muted">Open Ticket</a>
              </li>
              
            </ul>
          </div>

          {/* Social / Contact */}
          <div className="col mb-3">
            <h5 className="fw-semibold">Actions</h5>
            <a href="/add_skelbima" type="button" className="btn btn-success">+ Pridėti skelbimą</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
