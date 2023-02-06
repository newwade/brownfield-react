import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_COUNT } from "./store/flight/flightSlice";
import { ToastContainer, toast, Slide } from "react-toastify";
import "./style/home.css";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [flights, setFlights] = useState([]);
  const [count, setCount] = useState(1);
  const [setError] = useState("");
  const [states] = useState([
    "chennai",
    "delhi",
    "mumbai",
    "bangalore",
    "Kolkata",
    "kerala",
    "pune",
  ]);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const base_url = process.env.REACT_APP_BASE_URL;

  useEffect(() => {}, []);

  const handleFlightSearch = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      setCount(e.target.passengers.value);
      const requestData = JSON.stringify(Object.fromEntries(formData));
      const settings = {
        method: "POST",
        body: requestData,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(`${base_url}/api/v1/flight/find`, settings);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      if (response.ok && data) {
        setFlights(data);
      }
    } catch (error) {
      setError(error.message);
      setFlights([]);
      toast.warning(error.message, {
        transition: Slide,
      });
      console.log(error);
    }
  };

  const handleRedirectBooking = (flight) => {
    const res = dispatch(SET_COUNT(count));
    if (res) {
      navigate(`/flight/${flight.id}`);
    }
  };
  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={true}
        newestOnTop={true}
      />
      <div className="container ">
        <div className="row vh-100">
          <div className="col-md-4 column d-flex flex-column justify-content-center align-items-center">
            <form onSubmit={handleFlightSearch}>
              <div className="form-group mb-2">
                <label htmlFor="origin" className="text-center">
                  From
                </label>
                <select
                  className="form-control  form-control-lg"
                  name="origin"
                  id="origin"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  required
                >
                  <option value="">--</option>
                  {states
                    .filter((state) => state !== destination)
                    .map((state, i) => {
                      return (
                        <option key={i} value={state}>
                          {state}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div
                role="button"
                className="text-center "
                onClick={() => {
                  let temp = origin;
                  setOrigin(destination);
                  setDestination(temp);
                }}
              >
                <i className="bi bi-arrow-down-up fw-bolder fs-5"></i>
              </div>
              <div className="form-group mb-2">
                <label htmlFor="destination">To</label>
                <select
                  className="form-control form-control-lg"
                  id="destination"
                  name="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                >
                  <option value="">--</option>
                  {states
                    .filter((state) => state !== origin)
                    .map((state, i) => {
                      return (
                        <option key={i} value={state}>
                          {state}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="form-group mb-2">
                <label htmlFor="date">On</label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  name="date"
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="passengers">Passengers</label>
                <input
                  type="number"
                  className="form-control"
                  id="passengers"
                  name="passengers"
                  min="1"
                  max="10"
                  required
                />
              </div>
              <button
                type="submit"
                id="search-flights"
                className="btn btn-primary"
              >
                Search
              </button>
            </form>
          </div>
          <div
            className="col-md-8 column overflow-auto"
            style={{ marginTop: "5%" }}
          >
            <table className="table ">
              <thead>
                <tr>
                  <th>Airline</th>
                  <th>Number</th>
                  <th>Date</th>
                  <th>Dep.</th>
                  <th>Arr.</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {flights?.map((flight) => {
                  return (
                    <tr
                      key={flight.id}
                      className="flight"
                      onClick={() => handleRedirectBooking(flight)}
                    >
                      <td>{flight.flightInfo.airlineInfo.nameOfAirline}</td>
                      <td>{flight.flightInfo.flightNumber}</td>
                      <td>{flight.flightDate}</td>
                      <td>{flight.departureTime}</td>
                      <td>{flight.arrivalTime}</td>
                      <td>{flight.fare.fare}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {flights.length <= 0 ? (
              <p className="text-secondary text-center">No Flight Found</p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div
        style={{ marginTop: "20%" }}
        className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary"
      ></div>
    </div>
  );
}
