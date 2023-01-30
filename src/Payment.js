import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Slide } from "react-toastify";
import {
  REMOVE_FLIGHT,
  REMOVE_PASSENGER,
  RESET_COUNT,
} from "./store/flight/flightSlice";
import "./style/payment.css";

function Payment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const { data: flight, passengers } = useSelector((state) => state.flight);
  const base_url = process.env.REACT_APP_BASE_URL;

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const paymentData = Object.fromEntries(formData);
      const request = {
        flightId: flight.id,
        userId: user.id,
        passengers: passengers,
        payment: paymentData,
      };
      console.log(request);
      const settings = {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(`${base_url}/api/v1/book/save`, settings);
      const data = await response.json();
      if (response.status !== 201) {
        throw new Error(data.message);
      }
      if (response.status === 201 && data) {
        console.log(data);
        dispatch(RESET_COUNT());
        dispatch(REMOVE_FLIGHT());
        dispatch(REMOVE_PASSENGER());
        navigate(`/payment/success/${data.payment.paymentId}`, {
          replace: true,
        });
      }
    } catch (error) {
      toast.warning(error.message, {
        transition: Slide,
      });
      console.log(error);
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
                    pattern="[0-9]{16}"
                    required
                  />
                  <img
                    className="card__img"
                    src="https://img.icons8.com/color/48/000000/visa.png"
                    width="64px"
                    height="60px"
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
                    size="17"
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
                        minLength="3"
                        maxLength="3"
                        pattern="[0-9]{3}"
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
