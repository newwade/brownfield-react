import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_COUNT } from "./store/flight/flightSlice";
import { ToastContainer, toast, Slide, Flip } from "react-toastify";
import "./style/home.css";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [flights, setFlights] = useState([]);
  const [count, setCount] = useState(1);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      const response = await fetch(
        "http://localhost:8081/api/v1/flight/find",
        settings
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      if (response.ok && data) {
        setFlights(data);
        console.log(data);
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
        autoClose={500}
        hideProgressBar={true}
        newestOnTop={true}
      />
      <div className="container ">
        <div className="row vh-100">
          <div className="col-md-4 column d-flex flex-column justify-content-center align-items-center">
            <form onSubmit={handleFlightSearch}>
              <div className="form-group mb-2">
                <label for="origin" className="text-center">
                  From
                </label>
                <input
                  type="text"
                  id="origin"
                  name="origin"
                  className="form-control form-control-lg"
                  required
                />
                {/* <select className="form-control" id="from">
                  <option></option>
                  <option value="BOM">Mumbai - BOM</option>
                  <option value="DEL">Delhi - DEL</option>
                  <option value="BLR">Bangalore - BLR</option>
                  <option value="PUN">Pune - PUN</option>
                  <option value="KOL">Kolkatta - KOL</option>
                </select> */}
              </div>
              <div className="form-group mb-2">
                <label for="destination">To</label>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  className="form-control form-control-lg"
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label for="date">On</label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  name="date"
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label for="passengers">Passengers</label>
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
                Submit
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
                  <th>Name</th>
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
      {/* <main classNameName="my-form">
        <div classNameName="container align-center col-sm-8">
          <div classNameName="row justify-content-center">
            <div classNameName="col-md-12">
              <div classNameName="card border-light w-auto special-card">
                <div classNameName="card-header border-light text-center">
                  Search Flights
                </div>
                <div classNameName="card-body">
                  <form name="searchFlightsForm" method="post" role="form">
                    <div classNameName="row searchForm">
                      <div classNameName="col-lg-12">
                        <div classNameName="row">
                          <div classNameName="col-md-2 col-sm-3 col-sm-12 ">
                            <input
                              classNameName="form-control"
                              id="origin"
                              name="origin"
                              placeholder="Origin"
                              type="text"
                            />
                          </div>
                          <div classNameName="col-sm-2 col-md-3 col-sm-12">
                            <input
                              classNameName="form-control"
                              id="destination"
                              name="destination"
                              placeholder="Destination"
                              type="text"
                            />
                          </div>
                          <div classNameName="col-sm-2 col-md-3 col-sm-12 ">
                            <input
                              type="date"
                              id="date"
                              classNameName="form-control search-slt"
                              placeholder="Travel Date"
                            />
                          </div>
                          <div classNameName="col-sm-2 col-md-3 col-sm-12">
                            <button type="submit" classNameName="btn btn-primary">
                              Search Flight
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main> */}
    </div>
  );
}
