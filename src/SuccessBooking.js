import React from "react";
import { Link, useParams } from "react-router-dom";
import "./style/success.css";

function SuccessBooking() {
  const { id } = useParams();

  return (
    <div className="container booking_confirm">
      <div className="printer-top"></div>
      <Link to="/">
        <button
          type="button"
          className="btn btn-primary btn-lg , fixed-bottom"
          style={{ position: "absolute" }}
        >
          Home
        </button>
      </Link>
      <div className="paper-container">
        <div className="printer-bottom"></div>

        <div className="paper bg-light">
          <div className="main-contents">
            <div className="success-icon">&#10004;</div>
            <div className="success-title">Payment Complete</div>
            <div className="success-description">
              Thank you for completing the payment! You will shortly receive an
              email of your payment.
            </div>
            <div className="order-details">
              <div className="order-number-label">Transaction ID</div>
              <div className="order-number">{id}</div>
              <div className="complement">Thank You!</div>
            </div>
          </div>
          <div className="jagged-edge"></div>
        </div>
      </div>
    </div>
  );
}

export default SuccessBooking;
