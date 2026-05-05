import React, { useMemo, useState } from "react";
import Carousel from "./Carousel";

const donorSeed = [
  { name: "Joy Wanjiku", bloodGroup: "A+", county: "Nairobi", phone: "0700111222" },
  { name: "Brian Kibet", bloodGroup: "O-", county: "Nakuru", phone: "0700999888" },
  { name: "Linet Achieng", bloodGroup: "B+", county: "Kisumu", phone: "0711223344" },
  { name: "Peter Mwangi", bloodGroup: "AB+", county: "Kiambu", phone: "0722556677" },
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
  const [search, setSearch] = useState("");
  const [groupFilter, setGroupFilter] = useState("All");

  const localDonors = useMemo(() => {
    const stored = JSON.parse(localStorage.getItem("bdn_donors") || "[]");
    return [...stored, ...donorSeed];
  }, []);

  const filteredDonors = useMemo(() => {
    return localDonors.filter((donor) => {
      const term = search.toLowerCase();
      const matchesText =
        donor.name.toLowerCase().includes(term) ||
        donor.county.toLowerCase().includes(term) ||
        donor.bloodGroup.toLowerCase().includes(term);
      const matchesGroup =
        groupFilter === "All" ? true : donor.bloodGroup === groupFilter;
      return matchesText && matchesGroup;
    });
  }, [groupFilter, localDonors, search]);

  return (
    <>
      <Carousel />

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
        <h2 className="fw-bold mb-3">Available Donors</h2>
        <div className="row g-2">
          <div className="col-md-8">
            <input
              className="form-control bdn-input"
              type="search"
              placeholder="Search by name, county, or blood group..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-md-4">
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
          filteredDonors.map((donor, index) => (
            <div className="col-md-6 col-lg-4" key={`${donor.phone}-${index}`}>
              <article className="card bdn-card h-100">
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
                </div>
              </article>
            </div>
          ))
        )}
      </section>
    </>
  );
};

export default Donors;