import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";

const donorSeed = [
  { name: "Joy Wanjiku", bloodGroup: "A+", county: "Nairobi", phone: "0700111222" },
  { name: "Brian Kibet", bloodGroup: "O-", county: "Nakuru", phone: "0700999888" },
  { name: "Linet Achieng", bloodGroup: "B+", county: "Kisumu", phone: "0711223344" },
  { name: "Peter Mwangi", bloodGroup: "AB+", county: "Kiambu", phone: "0722556677" },
  { name: "Alice Njeri", bloodGroup: "O+", county: "Nyeri", phone: "0703001122" },
  { name: "Kevin Otieno", bloodGroup: "A-", county: "Kisumu", phone: "0703001133" },
  { name: "Mercy Jepkorir", bloodGroup: "B-", county: "Eldoret", phone: "0703001144" },
  { name: "Daniel Maina", bloodGroup: "AB-", county: "Muranga", phone: "0703001155" },
  { name: "Faith Chebet", bloodGroup: "O+", county: "Kericho", phone: "0703001166" },
  { name: "Mark Kiptoo", bloodGroup: "A+", county: "Uasin Gishu", phone: "0703001177" },
  { name: "Sharon Akinyi", bloodGroup: "B+", county: "Siaya", phone: "0703001188" },
  { name: "John Kamau", bloodGroup: "O-", county: "Nairobi", phone: "0703001199" },
  { name: "Susan Wairimu", bloodGroup: "AB+", county: "Kiambu", phone: "0703001200" },
  { name: "Victor Muli", bloodGroup: "A-", county: "Machakos", phone: "0703001211" },
  { name: "Diana Atieno", bloodGroup: "B-", county: "Kisii", phone: "0703001222" },
  { name: "Paul Kariuki", bloodGroup: "O+", county: "Nakuru", phone: "0703001233" },
  { name: "Grace Naliaka", bloodGroup: "A+", county: "Bungoma", phone: "0703001244" },
  { name: "James Muthoni", bloodGroup: "AB-", county: "Meru", phone: "0703001255" },
  { name: "Naomi Chepkemoi", bloodGroup: "B+", county: "Bomet", phone: "0703001266" },
  { name: "Dennis Omondi", bloodGroup: "O-", county: "Homa Bay", phone: "0703001277" },
];

const hospitalTicker = [
  { image: "/images/t1.png", name: "MP Shah Hospital" },
  { image: "/images/t2.png", name: "Aga Khan Hospital Nairobi" },
  { image: "/images/t3.png", name: "Kenyatta National Hospital (KNH)" },
  { image: "/images/t4.png", name: "Metropolitan Hospital Nairobi" },
  { image: "/images/t5.png", name: "Kijabe Hospital" },
  { image: "/images/t6.png", name: "Bilal Hospital" },
  { image: "/images/t7.png", name: "Valley Hospital" },
  { image: "/images/t8.png", name: "Aga Khan University Hospital" },
  { image: "/images/t9.png", name: "Karen Hospital" },
  { image: "/images/t10.png", name: "The Nairobi Hospital" },
];

const Donors = () => {
  const getStats = () => ({
    requests: JSON.parse(localStorage.getItem("bdn_requests") || "[]").length,
    payments: JSON.parse(localStorage.getItem("bdn_payments") || "[]").length,
  });
  const [search, setSearch] = useState("");
  const [groupFilter, setGroupFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [visibleCount, setVisibleCount] = useState(6);
  const [lastUpdated] = useState(new Date().toLocaleString());
  const [stats, setStats] = useState(getStats);

  const localDonors = useMemo(() => {
    const stored = JSON.parse(localStorage.getItem("bdn_donors") || "[]");
    return [...stored, ...donorSeed];
  }, []);

  const filteredDonors = useMemo(() => {
    const donors = localDonors.filter((donor) => {
      const term = search.toLowerCase();
      const matchesText =
        donor.name.toLowerCase().includes(term) ||
        donor.county.toLowerCase().includes(term) ||
        donor.bloodGroup.toLowerCase().includes(term);
      const matchesGroup =
        groupFilter === "All" ? true : donor.bloodGroup === groupFilter;
      return matchesText && matchesGroup;
    });
    return donors.sort((a, b) => {
      if (sortBy === "county") return a.county.localeCompare(b.county);
      if (sortBy === "bloodGroup") return a.bloodGroup.localeCompare(b.bloodGroup);
      return a.name.localeCompare(b.name);
    });
  }, [groupFilter, localDonors, search, sortBy]);

  useEffect(() => {
    setVisibleCount(6);
  }, [groupFilter, search, sortBy]);

  const visibleDonors = filteredDonors.slice(0, visibleCount);
  const hasMoreDonors = visibleCount < filteredDonors.length;

  const resetStatistics = () => {
    localStorage.setItem("bdn_requests", JSON.stringify([]));
    localStorage.setItem("bdn_payments", JSON.stringify([]));
    localStorage.setItem("bdn_schedules", JSON.stringify([]));
    setStats(getStats());
  };

  return (
    <>
      <Carousel />
      <h1 className="text-center">Partnership Hospitals</h1>
      <section className="mb-4">
        <div className="hospital-ticker">
          <div className="hospital-ticker-track">
            {[...hospitalTicker, ...hospitalTicker].map((hospital, index) => (
              <article className="hospital-ticker-item" key={`${hospital.name}-${index}`}>
                <img src={hospital.image} alt={hospital.name} />
                <p>{hospital.name}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-3">
        <div className="alert bdn-alert mb-3">
          <strong>Emergency:</strong> O- and A- blood needed urgently today in Nairobi and
          Kiambu.
        </div>
        <h2 className="fw-bold mb-3">Available Donors</h2>
        <p className="small text-muted mb-3">{filteredDonors.length} donors found</p>
        <p className="small text-muted">Last updated: {lastUpdated}</p>
        <div className="d-flex flex-wrap gap-2 mb-3">
          {["Nairobi", "Kiambu", "Nakuru", "Kisumu"].map((county) => (
            <button
              key={county}
              type="button"
              className="btn btn-sm btn-outline-success"
              onClick={() => setSearch(county)}
            >
              {county}
            </button>
          ))}
        </div>
        <div className="row g-2">
          <div className="col-md-6">
            <input
              className="form-control bdn-input"
              type="search"
              placeholder="Search by name, county, or blood group..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-select bdn-input"
              value={groupFilter}
              onChange={(e) => setGroupFilter(e.target.value)}
            >
              <option value="All">All Blood Groups</option>
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
          <div className="col-md-3">
            <select
              className="form-select bdn-input"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort: Name</option>
              <option value="county">Sort: County</option>
              <option value="bloodGroup">Sort: Blood Group</option>
            </select>
          </div>
          <div className="col-12">
            <button
              type="button"
              className="btn btn-sm bdn-btn-outline"
              onClick={() => {
                setSearch("");
                setGroupFilter("All");
                setSortBy("name");
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </section>

      <section className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="stats-box h-100">
            <h6 className="fw-bold">How It Works</h6>
            <p className="small mb-0">1) Choose donor  2) Schedule donation  3) Pay via M-Pesa</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="stats-box h-100">
            <h6 className="fw-bold">Requests Logged</h6>
            <p className="h4 mb-0 text-danger">{stats.requests}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="stats-box h-100">
            <h6 className="fw-bold">Payments Recorded</h6>
            <p className="h4 mb-0 text-success">{stats.payments}</p>
          </div>
        </div>
        <div className="col-12">
          <button type="button" className="btn btn-sm bdn-btn-outline" onClick={resetStatistics}>
            Reset Statistics
          </button>
        </div>
      </section>

      <section className="row g-3">
        {filteredDonors.length === 0 ? (
          <div className="col-12">
            <div className="alert bdn-alert mb-0">
              No donors match your search. Try another blood group or county.
            </div>
          </div>
        ) : (
          visibleDonors.map((donor, index) => (
            <div className="col-md-6 col-lg-4" key={`${donor.phone}-${index}`}>
              <article className="card bdn-card bdn-donor-card h-100">
                <div className="card-body">
                  <h5 className="card-title fw-bold mb-2">{donor.name}</h5>
                  <p className="mb-1">
                    <span className="fw-semibold">Blood Group:</span>{" "}
                    {donor.bloodGroup}
                  </p>
                  <p className="mb-1">
                    <span className="fw-semibold">County:</span> {donor.county}
                  </p>
                  <p className="mb-0">
                    <span className="fw-semibold">Phone:</span> {donor.phone}
                  </p>
                  <p className="mb-0 mt-2 text-danger fw-semibold">Donation Fee: KSh 1400</p>
                  <span className="badge bdn-badge mt-2">Available</span>
                  <Link
                    to="/schedule-donation"
                    state={{
                      singleproduct: {
                        product_name: donor.name,
                        product_description: `Blood Group ${donor.bloodGroup} donor from ${donor.county}.`,
                        product_cost: 1400,
                        product_photo: "t1.png",
                      },
                    }}
                    className="btn bdn-btn btn-sm mt-3"
                  >
                    Select Donor & Continue
                  </Link>
                </div>
              </article>
            </div>
          ))
        )}
      </section>
      {hasMoreDonors && (
        <div className="text-center mt-4">
          <button
            className="btn bdn-btn px-4"
            onClick={() => setVisibleCount((prev) => prev + 6)}
            type="button"
          >
            See More
          </button>
        </div>
      )}
      {!hasMoreDonors && filteredDonors.length > 6 && (
        <div className="text-center mt-3">
          <button
            className="btn btn-sm bdn-btn-outline px-4"
            onClick={() => setVisibleCount(6)}
            type="button"
          >
            Show Less
          </button>
        </div>
      )}

      <section className="row g-3 mt-2">
        <div className="col-md-4">
          <div className="stats-box h-100">
            <h6 className="fw-bold">Blood Stock - O-</h6>
            <div className="progress mb-2">
              <div className="progress-bar bg-danger" style={{ width: "30%" }} />
            </div>
            <small className="text-muted">Low stock - priority requests only.</small>
          </div>
        </div>
        <div className="col-md-4">
          <div className="stats-box h-100">
            <h6 className="fw-bold">Blood Stock - A+</h6>
            <div className="progress mb-2">
              <div className="progress-bar bg-warning" style={{ width: "55%" }} />
            </div>
            <small className="text-muted">Moderate stock.</small>
          </div>
        </div>
        <div className="col-md-4">
          <div className="stats-box h-100">
            <h6 className="fw-bold">Blood Stock - B+</h6>
            <div className="progress mb-2">
              <div className="progress-bar bg-success" style={{ width: "78%" }} />
            </div>
            <small className="text-muted">Healthy stock level.</small>
          </div>
        </div>
      </section>

      <section className="mt-4">
        <h3 className="fw-bold mb-3">Community Feedback</h3>
        <div className="row g-3">
          <div className="col-md-6">
            <div className="card bdn-card p-3 h-100">
              <p className="mb-2">
                "I requested blood and got support quickly. The process was simple and clear."
              </p>
              <small className="text-muted">- Mercy, Nairobi</small>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card bdn-card p-3 h-100">
              <p className="mb-2">
                "Scheduling and M-Pesa payment were easy. Great for emergency coordination."
              </p>
              <small className="text-muted">- Brian, Nakuru</small>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-4">
        <h3 className="fw-bold mb-3">Quick FAQs</h3>
        <div className="accordion" id="homeFaqs">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faqOne"
              >
                How do I request blood?
              </button>
            </h2>
            <div id="faqOne" className="accordion-collapse collapse show" data-bs-parent="#homeFaqs">
              <div className="accordion-body">
                Go to Request Blood, submit details, then select a donor and continue.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faqTwo"
              >
                Is payment secure?
              </button>
            </h2>
            <div id="faqTwo" className="accordion-collapse collapse" data-bs-parent="#homeFaqs">
              <div className="accordion-body">
                Yes, payments are sent through M-Pesa and recorded in your booking history.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Donors;