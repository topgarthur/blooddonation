import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ScheduleDonation = () => {
  const navigate = useNavigate();
  const { singleproduct } = useLocation().state || {};
  const [schedule, setSchedule] = useState({
    donorName: singleproduct?.product_name || "",
    center: "",
    date: "",
    time: "",
    notes: "",
    amount: singleproduct?.product_cost || 1400,
  });
  const [response, setResponse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => {
    setSchedule((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (Number(schedule.amount) < 1400) {
      setError("Minimum donation support amount is KSh 1400.");
      return;
    }
    setIsSubmitting(true);
    const user = JSON.parse(
      localStorage.getItem("bdn_user") || sessionStorage.getItem("bdn_user") || "null"
    );
    const existing = JSON.parse(localStorage.getItem("bdn_schedules") || "[]");
    localStorage.setItem(
      "bdn_schedules",
      JSON.stringify(
        [
          { ...schedule, userEmail: user?.email || "guest", status: "Scheduled" },
          ...existing,
        ]
      )
    );
    setResponse("Donation appointment booked successfully.");
    setIsSubmitting(false);
  };

  const goToPayment = () => {
    navigate("/lipa-na-mpesa", {
      state: {
        singleproduct: {
          ...singleproduct,
          product_cost: Number(schedule.amount),
        },
      },
    });
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="card bdn-card p-4 p-md-5">
          <h2 className="fw-bold mb-3">Schedule a Donation</h2>
          <p className="mb-4">Choose your nearest blood bank and reserve a donation slot.</p>
          {!singleproduct && (
            <div className="alert alert-warning">
              No donor selected. Please go back and choose a donor.
              <div className="mt-2">
                <Link className="btn btn-sm-primary bdn-btn" to="/">
                  Go to Available Donors
                </Link>
              </div>
            </div>
          )}
          {response && (
            <div className="alert bdn-alert d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-4">
              <span>{response}</span>
              <button type="button" className="btn bdn-btn btn-sm btn-outline-success" onClick={goToPayment}>
                Continue to Lipa na M-Pesa
              </button>
            </div>
          )}
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <input
                name="donorName"
                className="form-control bdn-input"
                placeholder="Donor Name"
                value={schedule.donorName}
                onChange={onChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                min="1400"
                name="amount"
                className="form-control bdn-input"
                value={schedule.amount}
                onChange={onChange}
                required
              />
              <small className="text">Minimum required: KSh 1400</small>
            </div>
            <div className="col-md-6">
              <input
                name="center"
                className="form-control bdn-input"
                placeholder="Donation Center"
                value={schedule.center}
                onChange={onChange}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="date"
                name="date"
                className="form-control bdn-input"
                value={schedule.date}
                onChange={onChange}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="time"
                name="time"
                className="form-control bdn-input"
                value={schedule.time}
                onChange={onChange}
                required
              />
            </div>
          
            <div className="col-12 btn btn-outline-success">
              <button type="submit" className="btn bdn-btn w-100">
                {isSubmitting ? "Saving..." : "Confirm Appointment"}
              </button>
            </div>
            <div className="col-12">
              <small className="text">
                By scheduling, you confirm details are correct and agree to donation terms.
              </small>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleDonation;
