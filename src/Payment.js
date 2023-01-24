import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style/payment.css";

function Payment() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.data);
  const { data: flight, passengers } = useSelector((state) => state.flight);

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
      const response = await fetch(
        "http://localhost:8081/api/v1/book/save",
        settings
      );
      const data = await response.json();
      if (response.status !== 201) {
        throw new Error(data.message);
      }
      if (response.status === 201 && data) {
        console.log(data);
        navigate("/payment/success");
      }
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };
  return (
    <div className="payment">
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
                    size="17"
                    minLength="16"
                    maxLength="16"
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
                  />
                </div>
                <div className="form-group pt-2">
                  <div className="row d-flex">
                    <div className="col-sm-4">
                      <p className="text-warning mb-0">Expiration</p>
                      <input
                        className="card__input"
                        type="text"
                        name="exp"
                        placeholder="MM/YYYY"
                        size="7"
                        id="exp"
                        minLength="7"
                        maxLength="7"
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
                        size="1"
                        minLength="3"
                        maxLength="3"
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
