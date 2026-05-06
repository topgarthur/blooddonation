import React from "react";
import { Link } from "react-router-dom";

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
            <div className="d-flex gap-2 mt-3">
              <a className="btn btn-sm btn-light" href="tel:+254700000111">
                Call
              </a>
              <a className="btn btn-sm btn-light" href="mailto:support@blooddonationnetwork.org">
                Email
              </a>
              <a
                className="btn btn-sm btn-light"
                href="https://wa.me/254700000111"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </div>
          <div className="col-md-4">
            <h5 className="fw-bold">Quick Links</h5>
            <p className="mb-1 small">
              <Link className="footer-link" to="/about">
                About Us
              </Link>
            </p>
            <p className="mb-1 small">
              <Link className="footer-link" to="/contact">
                Contact
              </Link>
            </p>
            <p className="mb-1 small">
              <Link className="footer-link" to="/faqs">
                FAQs
              </Link>
            </p>
            <p className="mb-0 small">Monday - Friday: 8:00 AM - 7:00 PM</p>
          </div>
          <div>
            <a></a>
          </div>
        </div>
        <hr className="border-light my-4" />
        <p className="small mb-0 text-center">
          @2026 Blood Donation Network. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;