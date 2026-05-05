import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("bdn_user", JSON.stringify({ email, password }));
    setMessage("Sign in successful. You can now manage donation activity.");
    navigate("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-6">
        <div className="card bdn-card p-4 p-md-5">
          <h2 className="fw-bold mb-3">Volunteer Sign In</h2>
          <p className="mb-4">
            Access blood requests and donor coordination in one place.
          </p>
          {message && <div className="alert bdn-alert">{message}</div>}
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-12">
              <input
                type="email"
                className="form-control bdn-input"
                placeholder="Enter Email"

                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="col-12">
              <input
                type="password"
                className="form-control bdn-input"
                placeholder="Enter Password"

                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn bdn-btn w-100">
                Sign In
              </button>
            </div>
          </form>
          <p className="mt-3 mb-0 small">
            Not registered as a donor? <Link to="/register-donor">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;