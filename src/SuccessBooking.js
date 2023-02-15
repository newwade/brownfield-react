import React, { useEffect, useState } from "react";
import axios from "./axios/axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./style/success.css";
import { LOG_OUT } from "./store/auth/authSlice";

function SuccessBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.data?.token);
  const user = useSelector((state) => state.user.loggedIn);
  const dispatch = useDispatch();
  const handleFetchBooking = async () => {
    try {
      const response = await axios.get(`/api/v1/book/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      let err_status = error.response.status;
      if (err_status === 404) {
        navigate("*", { replace: true });
      }
      if (err_status === 403) {
        dispatch(LOG_OUT());
      }
    }
  };

  useEffect(() => {
    if (!user) {
      return navigate("/login");
    }
  });

  useEffect(() => {
    handleFetchBooking();
  }, []);

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
