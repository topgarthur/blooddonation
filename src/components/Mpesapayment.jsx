import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Mpesapayment = () => {
  const { singleproduct } = useLocation().state || {};
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState(singleproduct?.product_cost || 1400);
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const [copied, setCopied] = useState(false);

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (singleproduct) {
      setError("Please select a donor first from Available Donors.");
      return;
    }
    setError("");
    setSuccess("");
    setReference("");
    
    if (Number(amount) < 1400) {
      setError("Minimum payment amount is KSh 1400.");
      return;
    }
    setLoading("Please wait...");
    const formdata = new FormData();
    formdata.append("amount", amount);
    formdata.append("phone", phone);
    try {
      const response = await axios.post(
        "https://matthiashiggs.alwaysdata.net/api/mpesa_payment",
        formdata
      );
      setSuccess(response.data.message || "M-Pesa payment request sent.");
      setReference(
        response.data.reference ||
          response.data.CheckoutRequestID ||
          `MPESA-${Date.now().toString().slice(-6)}`
      );
      const existingPayments = JSON.parse(localStorage.getItem("bdn_payments") || "[]");
      localStorage.setItem(
        "bdn_payments",
        JSON.stringify(
          [
            {
              donor: singleproduct.product_name,
              amount: Number(amount),
              phone,
              method: "M-Pesa",
              status: "Pending Confirmation",
              reference:
                response.data.reference ||
                response.data.CheckoutRequestID ||
                `MPESA-${Date.now().toString().slice(-6)}`,
              createdAt: new Date().toISOString(),
            },
            ...existingPayments,
          ]
        )
      );
      setPhone("");
      setLoading("");
    } catch (submitError) {
      setError("Something went wrong. Please try again.");
      setLoading("");
      console.error(submitError);
    }
  };

  return (
    <div className="row justify-content-center">
      <h1 className="text-success mb-3">Make Payment - Lipa na M-Pesa</h1>
      <div className="col-md-8 card bdn-card shadow p-4">
        {singleproduct ? (
          <>
            <div className="card-body px-0">
              <h2 className="text-info text-start">{singleproduct.product_name}</h2>
              <p className="text-start">{singleproduct.product_description}</p>
              <b className="text-danger text-start d-block">
                KSh {singleproduct.product_cost} (base amount)
              </b>
              <small className="d-block  mb-2">
                Minimum required: KSh 1400. You can add extra support.
              </small>
              <br />
              <h4 className="text-warning">{loading}</h4>
              <h4 className="text-success">{success}</h4>
              {reference && <p className="small mb-2">Reference: {reference}</p>}
              <h4 className="text-danger">{error}</h4>
              <form onSubmit={handlesubmit}>
                <div className="d-flex flex-wrap gap-2 mb-2 ">
                  {[1400, 2000, 3000].map((preset) => (
                    <button
                      type="button"
                      key={preset}
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => setAmount(preset)}
                    >
                      KSh {preset}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  className="form-control bdn-input"
                  min="1400"
                  placeholder="Custom amount (min 1400)"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
                <br />
                <input
                  type="number"
                  className="form-control bdn-input"
                  placeholder="Enter phone 254XXXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <br />
                <button type="submit" className="btn bdn-btn btn-outline-success w-100">
                  {loading ? "Processing..." : "Make Payment"}
                </button>
                <small className="d-block mt-2">
                  Ensure your phone is active to receive the M-Pesa prompt.
                </small>
              </form>
              {reference && (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary mt-2"
                  onClick={async () => {
                    await navigator.clipboard.writeText(reference);
                    setCopied(true);
                  }}
                >
                  {copied ? "Reference Copied" : "Copy Reference"}
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="card-body">
            <p className="mb-0">No donor selected. Please go back and choose a donor.</p>
            <Link className="btn bdn-btn btn-sm mt-3" to="/">
              Go to Available Donors
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mpesapayment;