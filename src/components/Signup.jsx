import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    bloodGroup: "A+",
    county: "",
    phone: "",
    email: "",
    password: "",
    lastDonationDate: "",
  });
  const [strength, setStrength] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onChange = (e) => {
    if (e.target.name === "password") {
      checkPasswordStrength(e.target.value);
    }
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (formData.password.length < 6) {
      setError("Password should have at least 6 characters.");
      return;
    }
    if (!/^2547\d{8}$/.test(formData.phone)) {
      setError("Phone must be in this format: 2547XXXXXXXX.");
      return;
    }
    const existing = JSON.parse(localStorage.getItem("bdn_donors") || "[]");
    const duplicateDonor = existing.some(
      (donor) => donor.email === formData.email || donor.phone === formData.phone
    );
    if (duplicateDonor) {
      setError("A donor with this email or phone already exists.");
      return;
    }
    localStorage.setItem("bdn_donors", JSON.stringify([formData, ...existing]));
    const users = JSON.parse(localStorage.getItem("bdn_users") || "[]");
    const userExists = users.some((user) => user.email === formData.email);
    if (!userExists) {
      localStorage.setItem(
        "bdn_users",
        JSON.stringify([{ name: formData.name, email: formData.email, password: formData.password }, ...users])
      );
    }
    localStorage.setItem(
      "bdn_user",
      JSON.stringify({ name: formData.name, email: formData.email, password: formData.password })
    );
    setMessage("Donor registration submitted successfully.");
    setFormData({
      name: "",
      bloodGroup: "A+",
      county: "",
      phone: "",
      email: "",
      password: "",
      lastDonationDate: "",
    });
    navigate("/");
  };
  const checkPasswordStrength = (password) => {
    if (!password) {
      setStrength("");
    } else if (password.length < 6) {
      setStrength("Weak");
    } else if (password.length < 10) {
      setStrength("Medium");
    } else {
      setStrength("Strong");
    }
  };
  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="card bdn-card auth-card shadow-sm p-4 p-md-5">
          <h2 className="fw-bold mb-3">Register as a Donor</h2>
          <p className="mb-4">
            Fill this form so hospitals can contact you when your blood type is
            needed.
          </p>

          {message && <div className="alert bdn-alert">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                name="name"
                className="form-control bdn-input"
                placeholder="Full Name"
                value={formData.name}
                onChange={onChange}
                required
              />
            </div>
            <div className="col-md-6">
              <select
                name="bloodGroup"
                className="form-select bdn-input"
                value={formData.bloodGroup}
                onChange={onChange}
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div className="col-md-6">
              <input
                type="text"
                name="county"
                className="form-control bdn-input"
                placeholder="County"
                value={formData.county}
                onChange={onChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="tel"
                name="phone"
                className="form-control bdn-input"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={onChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="email"
                name="email"
                className="form-control bdn-input"
                placeholder="Email Address"
                value={formData.email}
                onChange={onChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="password"
                name="password"
                className="form-control bdn-input"
                placeholder="Password"
                value={formData.password}
                onChange={onChange}
                required
              />
              {strength && (
                <small
                  className={`mt-1 d-block ${
                    strength === "Weak"
                      ? "text-danger"
                      : strength === "Medium"
                      ? "text-warning"
                      : "text-success"
                  }`}
                >
                  Password strength: {strength}
                </small>
              )}
            </div>
            <div className="col-md-6">
              <input
                type="date"
                name="lastDonationDate"
                className="form-control bdn-input"
                value={formData.lastDonationDate}
                onChange={onChange}
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn bdn-btn btn-outline-success w-100">
                Register Donor
              </button>
            </div>
          </form>
          <p className="mt-3 mb-0 small">
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;