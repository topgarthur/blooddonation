import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(
      localStorage.getItem("bdn_user") ||
        sessionStorage.getItem("bdn_user") ||
        "null"
    );
    setUser(loggedUser);
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("bdn_user");
    sessionStorage.removeItem("bdn_user");
    setUser(null);
    navigate("/signin");
  };

  return (
    <nav
      className="navbar navbar-expand-lg px-3 px-md-4 shadow-sm"
      style={{
        background: "linear-gradient(90deg, #8B0000, #C1121F)",
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        className="navbar-brand fw-bold text-white fs-4"
      >
        🩸 Blood Donation Network
      </Link>

      {/* Mobile Toggle */}
      <button
        className="navbar-toggler bg-light"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarLinks"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Navbar Links */}
      <div className="collapse navbar-collapse" id="navbarLinks">
        <div className="navbar-nav mx-auto text-center">

          <Link
            to="/"
            className="nav-link text-white"
          >
            Home
          </Link>

          <Link
            to="/register-donor"
            className="nav-link text-white "
          >
            Register Donor
          </Link>

          <Link
            to="/request-blood"
            className="nav-link text-white"
          >
            Request Blood
          </Link>

          <Link
            to="/schedule-donation"
            className="nav-link text-white"
          >
            Schedule Donation
          </Link>
        </div>

        {/* Right Side */}
        <div className="ms-auto d-flex align-items-center flex-wrap justify-content-center">

          {user ? (
            <>
              <span className="small text-white ">
                Welcome,{" "}
                {user.name ||
                  user.email?.split("@")[0] ||
                  "Donor"}
              </span>

              <button
                onClick={logout}
                className="btn btn-light rounded-pill px-4 fw-bold shadow-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Sign In */}
              <Link
                to="/signin"
                className="btn rounded-pill px-4 py-2 fw-bold shadow"
                 style={{
                  background:
                    "black",
                  color: "white",
                  border: "none",
                  minWidth: "120px",
                  transition: "0.3s ease",
                }}
              >
                Sign In
              </Link>

              {/* Sign Up */}
              <Link
                to="/register-donor"
                className="btn rounded-pill px-4 py-2 fw-bold shadow"
                style={{
                  background:
                    "black",
                  color: "white",
                  border: "none",
                  minWidth: "120px",
                  transition: "0.3s ease",
                }}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;