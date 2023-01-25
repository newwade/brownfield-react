import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PassengerForm from "./component/PassengerForm";
import { ADD_PASSENGER, SELECT } from "./store/flight/flightSlice";
import { ToastContainer, toast, Slide } from "react-toastify";

function Book() {
  const { count } = useSelector((state) => state.flight);
  const user = useSelector((state) => state.user.loggedIn);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [flight, setFlight] = useState();

  useEffect(() => {
    if (!user) {
      return navigate("/login");
    }
  });

  const getPassengers = async () => {
    try {
      setLoading(true);
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
      dispatch(SELECT(flight));
      const res = dispatch(ADD_PASSENGER(requestData));
      if (res) {
        navigate("/payment");
        return;
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      toast.warning(error.message, {
        transition: Slide,
      });
    } finally {
      setLoading(false);
    }
  };

  const getFlight = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/v1/flight/${id}`);
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message);
      }
      if (response.ok) {
        setFlight(data);
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      navigate("*", { replace: true });
    }
  };

  useEffect(() => {
    getFlight();
  }, []);
  return (
    <div className="container">
      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={true}
        newestOnTop={true}
      />
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
                  <span>{flight?.origin}</span>
                  {"->"}
                  <span>{flight?.destination}</span>
                </h5>
              </div>
              <div className="travel_date">
                <span>{flight?.flightDate}</span>{" "}
                <span>{flight?.departureTime}</span>
              </div>
            </div>
            <div className="trave_flight d-flex justify-content-between">
              <p>Flight </p>
              <span>{flight?.flightInfo.flightNumber}</span>
            </div>
            <div className="fare_desc">
              <div className="d-flex justify-content-between">
                <p>Passengers</p>
                <p>{count}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Fare</p>
                <p>{flight?.fare.fare}</p>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <h5>Payable Amount</h5>
              <p>${flight?.fare.fare * count}</p>
            </div>
            <button
              onClick={getPassengers}
              className={`btn btn-primary btn-book ${loading && "disabled"} `}
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
