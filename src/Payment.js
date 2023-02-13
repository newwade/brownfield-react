import axios from "./axios/axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Slide } from "react-toastify";
import { LOG_OUT } from "./store/auth/authSlice";
import {
  REMOVE_FLIGHT,
  REMOVE_PASSENGER,
  RESET_COUNT,
} from "./store/flight/flightSlice";
import "./style/payment.css";

function Payment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loggedIn, data: token } = useSelector((state) => state.user);
  const { data: flight, passengers } = useSelector((state) => state.flight);
  const [error, setError] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  useEffect(() => {
    if (!loggedIn) {
      return navigate("/login", { replace: true });
    }
  });

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const paymentData = Object.fromEntries(formData);
      const request = {
        flightId: flight.id,
        passengers: passengers,
        payment: paymentData,
      };
      console.log(request);
      const response = await axios.post(
        `/api/v1/book/save`,
        JSON.stringify(request),
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      );
      if (response.status === 201 && response.data) {
        dispatch(RESET_COUNT());
        dispatch(REMOVE_FLIGHT());
        dispatch(REMOVE_PASSENGER());
        navigate(`/payment/success/${response.data.bookingId}`, {
          replace: true,
        });
      }
    } catch (error) {
      toast.warning(error.message, {
        transition: Slide,
      });
      console.log(error);
      setError(error.response.data.message);
      let err_status = error.response.status;
      if (err_status === 403) {
        dispatch(LOG_OUT());
      }
    }
  };
  return (
    <div className="payment">
      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={true}
        newestOnTop={true}
      />
      <div className="container-fluid">
        <div className="row d-flex justify-content-center">
          <div className="col-sm-12">
            <div className="payment__card mx-auto bg-light">
              <p className="payment_heading">PAYMENT DETAILS</p>
              <form className="card-details" onSubmit={handleBooking}>
                <div className="form-group mb-0">
                  <p className="text-warning mb-0">Card Number</p>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    className="card__input cardNumber"
                    placeholder="1234 5678 9012 3457"
                    value={cardNumber}
                    onChange={(e) => {
                      if (!isNaN(e.target.value)) {
                        setCardNumber(e.target.value);
                      } else {
                        setCardNumber((card_number) => {
                          return card_number;
                        });
                      }
                    }}
                    pattern="[0-9]{16}"
                    title="please provide valid card number"
                    required
                  />
                  <img
                    className="card__img"
                    src="https://img.icons8.com/color/48/000000/visa.png"
                    width="64px"
                    height="60px"
                    alt="card"
                  />
                </div>
                <div className="form-group">
                  <p className="text-warning mb-0">Cardholder's Name</p>
                  <input
                    id="cardholderName"
                    name="cardholderName"
                    className="card__input cardholderName"
                    type="text"
                    placeholder="Name"
                    pattern="^[A-Za-z]+([ ]*[A-Za-z])+$"
                    title="invalid name"
                    required
                  />
                </div>
                <div className="form-group pt-2">
                  <div className="row d-flex">
                    <div className="col-sm-4">
                      <p className="text-warning mb-0">Expiration</p>
                      <input
                        className="card__input"
                        type="month"
                        name="exp"
                        placeholder="MM/YYYY"
                        min={
                          new Date().getFullYear() +
                          "-" +
                          (new Date().getMonth() + 1 < 10
                            ? "0" + (new Date().getMonth() + 1)
                            : new Date().getMonth() + 1)
                        }
                        id="exp"
                        required
                      />
                    </div>
                    <div className="col-sm-3">
                      <p className="text-warning mb-0">Cvv</p>
                      <input
                        id="cvc"
                        name="cvc"
                        className="card__input cvc"
                        type="password"
                        placeholder="&#9679;&#9679;&#9679;"
                        value={cvv}
                        onChange={(e) => {
                          if (!isNaN(e.target.value)) {
                            setCvv(e.target.value);
                          } else {
                            setCvv((cvv) => {
                              return cvv;
                            });
                          }
                        }}
                        pattern="[0-9]{3}"
                        title="please provide valid cvv"
                        required
                      />
                    </div>
                    <div className="text-center text-lg-start mt-4 pt-2">
                      <button type="submit" className="btn btn-primary">
                        Pay
                        <i className="fas fa-arrow-right px-1.8 py-.8"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
