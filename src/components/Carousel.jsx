import React from "react";
import { Link } from "react-router-dom";

const Carousel = () => {
  return (
    <section className="hero-card mb-4">
      <div className="row align-items-center g-4">
        <div className="col-md-8">
          <p className="badge bdn-badge mb-3">Save lives together</p>
          <h1 className="display-6 fw-bold mb-3">
            Join the Blood Donation Network and support your community.
          </h1>
          <p className="mb-4">
            Register as a donor, schedule your next donation, or place an urgent
            blood request for hospitals and patients in need.
          </p>

          <div className="d-flex gap-2 flex-wrap">
            {/* Button-style Link */}
            <Link to="/register-donor" className="btn btn-success">
              Become a Donor
            </Link>

            <Link to="/request-blood" className="btn btn-outline-primary">
              Request Blood
            </Link>
          </div>
        </div>

        <div className="col-md-4">
          <div className="stats-box">
            <h5 className="fw-bold mb-3">Current Network Impact</h5>
            <p className="mb-2">2,400+ registered donors</p>
            <p className="mb-2">580 emergency requests helped</p>
            <p className="mb-0">34 partner hospitals</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;