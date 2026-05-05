import React, { useState } from "react";

const Mpesapayment = () => {
  const [schedule, setSchedule] = useState({
    donorName: "",
    bloodGroup: "A+",
    center: "",
    date: "",
    time: "",
    notes: "",
  });
  const [response, setResponse] = useState("");

  const onChange = (e) => {
    setSchedule((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem("bdn_schedules") || "[]");
    localStorage.setItem("bdn_schedules", JSON.stringify([schedule, ...existing]));
    setResponse("Donation appointment booked successfully.");
    setSchedule({
      donorName: "",
      bloodGroup: "A+",
      center: "",
      date: "",
      time: "",
      notes: "",
    });
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="card bdn-card p-4 p-md-5">
          <h2 className="fw-bold mb-3">Schedule a Donation</h2>
          <p className="mb-4">
            Choose your nearest blood bank and reserve a donation slot.
          </p>
          {response && <div className="alert bdn-alert">{response}</div>}
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
              <select
                name="bloodGroup"
                className="form-select bdn-input"
                value={schedule.bloodGroup}
                onChange={onChange}
              >
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
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
            <div className="col-12">
              <textarea
                name="notes"
                className="form-control bdn-input"
                placeholder="Additional Notes (optional)"
                rows="3"
                value={schedule.notes}
                onChange={onChange}
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn bdn-btn w-100">
                Confirm Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Mpesapayment;