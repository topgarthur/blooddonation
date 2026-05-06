import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const Adddonors = () => {
  const navigate = useNavigate();
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
  const [error, setError] = useState("");
  const [requests, setRequests] = useState(
    JSON.parse(localStorage.getItem("bdn_requests") || "[]")
  );

  const recentRequests = useMemo(() => requests.slice(0, 5), [requests]);

  const handleChange = (e) => {
    setRequest((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!/^2547\d{8}$/.test(request.contactPhone)) {
      setError("Emergency phone must be in this format: 2547XXXXXXXX.");
      return;
    }
    const existing = [...requests];
    const duplicateRequest = existing.some(
      (item) =>
        item.patientName.toLowerCase() === request.patientName.toLowerCase() &&
        item.hospital.toLowerCase() === request.hospital.toLowerCase() &&
        item.bloodGroup === request.bloodGroup &&
        item.status !== "Completed"
    );
    if (duplicateRequest) {
      setError("A similar active request already exists. Please update the existing one.");
      return;
    }
    const nextRequests = [
      { ...request, status: "Pending", createdAt: new Date().toISOString() },
      ...existing,
    ];
    localStorage.setItem(
      "bdn_requests",
      JSON.stringify(nextRequests)
    );
    setRequests(nextRequests);
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
          {status && (
            <div className="alert bdn-alert d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
              <span>{status}</span>
              <button
                type="button"
                className="btn bdn-btn btn-sm"
                onClick={() => navigate("/schedule-donation")}
              >
                Continue to Payment
              </button>
            </div>
          )}
          {error && <div className="alert alert-danger">{error}</div>}
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
                <option value="Urgent">Normal</option>
                <option value="Very Urgent">Urgent</option>
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
              <button className="btn bdn-btn btn-outline-success w-100" type="submit">
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="col-lg-8 mt-3">
        <div className="card bdn-card p-4">
          <h5 className="fw-bold mb-3">Recent Blood Requests</h5>
          {recentRequests.length === 0 ? (
            <p className="mb-0 text-muted">No requests yet.</p>
          ) : (
            recentRequests.map((item, index) => (
              <div className="booking-item" key={`${item.patientName}-${index}`}>
                <p className="mb-1 fw-semibold">
                  {item.patientName} - {item.bloodGroup}
                </p>
                <p className="mb-1 small">
                  {item.hospital}, {item.county}
                </p>
                <div className="d-flex gap-2">
                  <span
                    className={`badge ${
                      item.urgency === "Critical"
                        ? "text-bg-danger"
                        : item.urgency === "Very Urgent"
                        ? "text-bg-warning"
                        : "text-bg-info"
                    }`}
                  >
                    {item.urgency}
                  </span>
                  <span className="badge text-bg-secondary">{item.status || "Pending"}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Adddonors;