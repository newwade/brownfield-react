import React, { useEffect, useState } from "react";
import axios from "./axios/axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PassengerForm from "./component/PassengerForm";
import { REGEX_EMAIL, REGEX_PHONE } from "./constant/constant";
import { SELECT_FLIGHT, ADD_PASSENGER } from "./store/flight/flightSlice";
import { ToastContainer, toast, Slide } from "react-toastify";
import { LOG_OUT } from "./store/auth/authSlice";

function Book() {
  const { count } = useSelector((state) => state.flight);
  const token = useSelector((state) => state.user.data);
  const user = useSelector((state) => state.user.loggedIn);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
        const mobile = formData.get("mobileNumber");
        const email = formData.get("emailAddress");
        if (!REGEX_EMAIL.test(email)) {
          throw new Error("invalid email");
        }
        if (!REGEX_PHONE.test(mobile)) {
          throw new Error("invalid phone");
        }
        requestData.push(Object.fromEntries(formData));
      });
      if (requestData.length > 1) {
        const isRedundant = requestData.every((val, i, arr) => {
          return (
            JSON.stringify(
              (({ firstName, lastName, gender }) => ({
                firstName,
                lastName,
                gender,
              }))(val)
            ) ===
            JSON.stringify(
              (({ firstName, lastName, gender }) => ({
                firstName,
                lastName,
                gender,
              }))(arr[0])
            )
          );
        });
        if (isRedundant) {
          throw new Error(
            "Passengers with same firstname, lastname found. Please check the passenger details."
          );
        }
      }
      dispatch(SELECT_FLIGHT(flight));
      const res = dispatch(ADD_PASSENGER(requestData));
      if (res) {
        navigate("/payment");
        return;
      }
    } catch (error) {
      console.log(error);
      toast.warning(error.message, {
        transition: Slide,
      });
    } finally {
      setLoading(false);
    }
  };

  const getFlight = async () => {
    try {
      const response = await axios.get(`/api/v1/flight/${id}`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
      if (response.status === 200) {
        setFlight(response.data);
      }
    } catch (error) {
      console.log(error);
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
    getFlight();
  }, []);
  return (
    <div className="container">
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={true}
        newestOnTop={true}
      />
      <div className="row ">
        <div className="col-md-8  d-flex flex-column mt-3">
          <h5>Passenger Details</h5>
          {[...Array(+count)].map((x, i) => (
            <PassengerForm key={i} p_no={i} />
          ))}
        </div>
        <div className=" trip_summary col-md-4 mt-3">
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
                <p>x{count}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Fare</p>
                <p>${flight?.fare.fare}</p>
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
