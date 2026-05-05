import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("bdn_user"));
    setUser(loggedUser);
  }, []);

  const logout = () => {
    localStorage.removeItem("bdn_user");
    setUser(null);
  };

  return (
    <nav className="navbar navbar-expand-lg bdn-navbar px-3 px-md-4">
      <Link to="/" className="navbar-brand fw-bold">
        Blood Donation Network
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarLinks"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarLinks">
        <div className="navbar-nav">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/register-donor" className="nav-link">
            Register Donor
          </Link>
          <Link to="/request-blood" className="nav-link">
            Request Blood
          </Link>
          <Link to="/schedule-donation" className="nav-link">
            Schedule Donation
          </Link>
        </div>

        <div className="ms-auto d-flex align-items-center gap-2">
          {user ? (
            <>
              <span className="small text-light">Welcome, {user.name}</span>
              <button onClick={logout} className="btn bdn-btn-outline btn-sm">
                Logout
              </button>
            </>
          ) : (
            <Link to="/signin" className="btn bdn-btn btn-sm px-3">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;