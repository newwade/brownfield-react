import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PassengerForm from "./component/PassengerForm";
import { ADD_PASSENGER } from "./store/flight/flightSlice";

function Book() {
  const { data: flight, count } = useSelector((state) => state.flight);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {}, []);

  const getPassengers = async () => {
    try {
      const forms = document.querySelectorAll("#passenger_form");
      const requestData = [];
      forms.forEach((form) => {
        const formData = new FormData(form);
        for (const value of formData.values()) {
          if (value.length === 0) {
            throw new Error("Please fill all passenger details");
          }
        }
        requestData.push(Object.fromEntries(formData));
      });
      const res = dispatch(ADD_PASSENGER(requestData));
      if (res) {
        navigate("/payment");
        return;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-8 d-flex flex-column ">
          <h5>Passenger Details</h5>
          {[...Array(+count)].map((x, i) => (
            <PassengerForm key={i} p_no={i} />
          ))}
        </div>
        <div className=" trip_summary col-4 ">
          <h5>Trip Summary</h5>
          <div className="bg-light p-2 rounded border">
            <div className="travel_desc d-flex justify-content-between">
              <div>
                <h5>
                  <span>{flight.origin}</span>
                  {"->"}
                  <span>{flight.destination}</span>
                </h5>
              </div>
              <div className="travel_date">
                <span>{flight.flightDate}</span>{" "}
                <span>{flight.departureTime}</span>
              </div>
            </div>
            <div className="trave_flight d-flex justify-content-between">
              <p>Flight </p>
              <span>{flight.flightInfo.flightNumber}</span>
            </div>
            <div className="fare_desc">
              <div className="d-flex justify-content-between">
                <p>Passengers</p>
                <p>{count}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Fare</p>
                <p>{flight.fare.fare}</p>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <h5>Payable Amount</h5>
              <p>${flight.fare.fare * count}</p>
            </div>
            <button
              onClick={getPassengers}
              className="btn btn-primary btn-book"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Book;
