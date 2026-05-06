import React from "react";

const contentByType = {
  about: {
    title: "About Us",
    text: "Blood Donation Network connects donors, hospitals, and families in urgent need. Our mission is to make blood access faster, safer, and easier through one simple platform.",
  },
  contact: {
    title: "Contact Us",
    text: "Reach our support team anytime for urgent blood requests and donor coordination. Call +254 700 000 111 or email support@blooddonationnetwork.org.",
  },
  faqs: {
    title: "Frequently Asked Questions",
    text: "You can register as a donor, request blood, and schedule donation in minutes. Keep your profile details updated so hospitals can contact you quickly.",
  },
};

const InfoPage = ({ type }) => {
  const page = contentByType[type] || contentByType.about;

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="card bdn-card p-4 p-md-5">
          <h2 className="fw-bold mb-3">{page.title}</h2>
          <p className="mb-0">{page.text}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
