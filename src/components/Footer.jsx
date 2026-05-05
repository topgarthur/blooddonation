import React from "react";

const Footer = () => {
  return (
    <footer className="bdn-footer mt-4">
      <div className="container py-4">
        <div className="row g-4">
          <div className="col-md-4">
            <h5 className="fw-bold">About Blood Donation Network</h5>
            <p className="mb-0 small">
              We connect donors and patients quickly so hospitals can receive safe
              blood on time. Every donor registration helps save lives.
            </p>
          </div>
          <div className="col-md-4">
            <h5 className="fw-bold">Emergency Contact</h5>
            <p className="mb-1 small">Hotline: +254 700 000 111</p>
            <p className="mb-1 small">Email: support@blooddonationnetwork.org</p>
            <p className="mb-0 small">Available 24/7 for urgent blood requests.</p>
          </div>
          <div className="col-md-4">
            <h5 className="fw-bold">Donation Hours</h5>
            <p className="mb-1 small">Monday - Friday: 8:00 AM - 7:00 PM</p>
            <p className="mb-0 small">Saturday - Sunday: 9:00 AM - 4:00 PM</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;