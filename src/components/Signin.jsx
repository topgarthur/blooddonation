import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("bdn_users") || "[]");
    const matchedUser = users.find(
      (user) => user.email === email && user.password === password
    );
    if (!matchedUser) {
      setError("Invalid email or password. Please sign up first.");
      setMessage("");
      return;
    }
    setError("");
    const storage = rememberMe ? localStorage : sessionStorage;
    localStorage.removeItem("bdn_user");
    sessionStorage.removeItem("bdn_user");
    storage.setItem("bdn_user", JSON.stringify({ name: matchedUser.name, email, password }));
    setMessage("Sign in successful. You can now manage donation activity.");
    navigate("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-6">
        <div className="card bdn-card auth-card p-4 p-md-5">
          <h2 className="fw-bold mb-3">Volunteer Sign In</h2>
          <p className="mb-4">
            Access blood requests and donor coordination in one place.
          </p>
          {error && <div className="alert alert-danger">{error}</div>}
          {message && <div className="alert bdn-alert">{message}</div>}
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-12">
              <input
                type="email"
                className="form-control bdn-input"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="col-12">
              <input
                type="password"
                className="form-control bdn-input"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="col-12">
              <div className="form-check">
                <input
                  id="rememberMe"
                  type="checkbox"
                  className="form-check-input"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="rememberMe" className="form-check-label">
                  Remember me on this device
                </label>
              </div>
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