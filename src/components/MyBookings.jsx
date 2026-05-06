import React, { useMemo, useState } from "react";

const MyBookings = () => {
  const user = JSON.parse(
    localStorage.getItem("bdn_user") || sessionStorage.getItem("bdn_user") || "null"
  );
  const [schedules, setSchedules] = useState(
    JSON.parse(localStorage.getItem("bdn_schedules") || "[]")
  );
  const [bookingSearch, setBookingSearch] = useState("");
  const payments = useMemo(() => JSON.parse(localStorage.getItem("bdn_payments") || "[]"), []);

  const cancelSchedule = (scheduleIndex) => {
    const updated = schedules.map((item, index) =>
      index === scheduleIndex ? { ...item, status: "Cancelled" } : item
    );
    setSchedules(updated);
    localStorage.setItem("bdn_schedules", JSON.stringify(updated));
  };

  const completeSchedule = (scheduleIndex) => {
    const updated = schedules.map((item, index) =>
      index === scheduleIndex ? { ...item, status: "Completed" } : item
    );
    setSchedules(updated);
    localStorage.setItem("bdn_schedules", JSON.stringify(updated));
  };

  const visibleSchedules = (user
    ? schedules.filter((item) => item.userEmail === user.email || item.userEmail === "guest")
    : schedules
  )
    .filter((item) =>
      `${item.donorName} ${item.center}`.toLowerCase().includes(bookingSearch.toLowerCase())
    )
    .map((item) => ({
    ...item,
    originalIndex: schedules.findIndex(
      (entry) =>
        entry.donorName === item.donorName &&
        entry.center === item.center &&
        entry.date === item.date &&
        entry.time === item.time
    ),
    }));

  return (
    <div className="row g-3">
      <div className="col-12">
        <div className="card bdn-card p-4">
          <h2 className="fw-bold mb-2">My Bookings</h2>
          <p className="mb-0 small">
            {user ? `Signed in as ${user.email}` : "Sign in to track your donation progress."}
          </p>
        </div>
      </div>

      <div className="col-lg-6">
        <div className="card bdn-card p-4 h-100">
          <h5 className="fw-bold mb-3">Scheduled Donations</h5>
          <input
            type="search"
            className="form-control bdn-input mb-3"
            placeholder="Search booking by donor or center..."
            value={bookingSearch}
            onChange={(e) => setBookingSearch(e.target.value)}
          />
          {visibleSchedules.length === 0 ? (
            <p className="mb-0 text-muted">No appointments yet.</p>
          ) : (
            visibleSchedules.slice(0, 6).map((item, index) => (
              <div className="booking-item" key={`${item.donorName}-${index}`}>
                <p className="mb-1 fw-semibold">{item.donorName}</p>
                <p className="mb-1 small">
                  {item.center} - {item.date} {item.time}
                </p>
                <span
                  className={`badge ${
                    item.status === "Cancelled"
                      ? "text-bg-danger"
                      : item.status === "Completed"
                      ? "text-bg-success"
                      : "text-bg-warning"
                  }`}
                >
                  {item.status || "Scheduled"}
                </span>
                <div className="d-flex gap-2 mt-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-success"
                    onClick={() => completeSchedule(item.originalIndex)}
                    disabled={item.status === "Completed" || item.status === "Cancelled"}
                  >
                    Mark Completed
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => cancelSchedule(item.originalIndex)}
                    disabled={item.status === "Cancelled" || item.status === "Completed"}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="col-lg-6">
        <div className="card bdn-card p-4 h-100">
          <h5 className="fw-bold mb-3">Payment Activity</h5>
          {payments.length === 0 ? (
            <p className="mb-0 text-muted">No payments yet.</p>
          ) : (
            payments.slice(0, 6).map((payment, index) => (
              <div className="booking-item" key={`${payment.phone}-${index}`}>
                <p className="mb-1 fw-semibold">{payment.donor}</p>
                <p className="mb-1 small">KSh {payment.amount}</p>
                <span
                  className={`badge ${
                    payment.status?.toLowerCase().includes("pending")
                      ? "text-bg-warning"
                      : payment.status?.toLowerCase().includes("failed")
                      ? "text-bg-danger"
                      : "text-bg-success"
                  }`}
                >
                  {payment.status || "Completed"}
                </span>
                <p className="small mb-0 mt-1">
                  Ref: {payment.reference || "No reference"}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
