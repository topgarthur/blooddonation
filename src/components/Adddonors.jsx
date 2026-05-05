import React, { useState } from "react";

const Adddonors = () => {
  const [request, setRequest] = useState({
    patientName: "",
    hospital: "",
    bloodGroup: "O+",
    units: "",
    county: "",
    urgency: "Urgent",
    contactPhone: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setRequest((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem("bdn_requests") || "[]");
    localStorage.setItem("bdn_requests", JSON.stringify([request, ...existing]));
    setStatus("Blood request submitted. Nearby donors can now respond.");
    setRequest({
      patientName: "",
      hospital: "",
      bloodGroup: "O+",
      units: "",
      county: "",
      urgency: "Urgent",
      contactPhone: "",
    });
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="card bdn-card p-4 p-md-5">
          <h2 className="fw-bold mb-3">Request Blood</h2>
          <p className="mb-4">
            Submit a verified request so available donors can be contacted
            quickly.
          </p>
          {status && <div className="alert bdn-alert">{status}</div>}
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <input
                name="patientName"
                className="form-control bdn-input"
                placeholder="Patient Name"
                value={request.patientName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                name="hospital"
                className="form-control bdn-input"
                placeholder="Hospital Name"
                value={request.hospital}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <select
                name="bloodGroup"
                className="form-select bdn-input"
                value={request.bloodGroup}
                onChange={handleChange}
              >
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <input
                type="number"
                min="1"
                name="units"
                className="form-control bdn-input"
                placeholder="Units Needed"
                value={request.units}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <select
                name="urgency"
                className="form-select bdn-input"
                value={request.urgency}
                onChange={handleChange}
              >
                <option value="Urgent">Urgent</option>
                <option value="Very Urgent">Very Urgent</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            <div className="col-md-6">
              <input
                name="county"
                className="form-control bdn-input"
                placeholder="County"
                value={request.county}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                name="contactPhone"
                className="form-control bdn-input"
                placeholder="Emergency Contact Phone"
                value={request.contactPhone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12">
              <button className="btn bdn-btn w-100" type="submit">
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Adddonors;