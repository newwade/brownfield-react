import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./style/ticket.css";

function SuccessCheckin() {
  const [booking, setBooking] = useState();
  const [setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const base_url = process.env.REACT_APP_BASE_URL;

  const handleFetchCheckin = async () => {
    try {
      const response = await fetch(`${base_url}/api/v1/checkin/${id}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      if (response.ok) {
        setBooking(data);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
      navigate("*", { replace: true });
    }
  };

  useEffect(() => {
    handleFetchCheckin();
  }, []);

  return (
    <div className="container">
      {booking && (
        <div>
          <div class="box">
            <ul class="left">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>

            <ul class="right">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            <div class="ticket">
              <span class="airline">BrownField Airline</span>
              <span class="airline airlineslip">BFA</span>
              <span class="boarding">Boarding pass</span>
              <div class="content">
                <span class="jfk">{booking.origin}</span>
                <span class="plane"></span>
                <span class="sfo">{booking.destination}</span>

                <span class="jfk jfkslip">
                  {booking.origin.substring(0, 3).toUpperCase()}
                </span>
                <span class="plane planeslip">
                  <svg
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    height="50"
                    width="50"
                    image-rendering="optimizeQuality"
                    shape-rendering="geometricPrecision"
                    text-rendering="geometricPrecision"
                    viewBox="0 0 500 500"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g stroke="#222">
                      <line
                        fill="none"
                        stroke-linecap="round"
                        stroke-width="30"
                        x1="300"
                        x2="55"
                        y1="390"
                        y2="390"
                      />
                      <path
                        d="M98 325c-9 10 10 16 25 6l311-156c24-17 35-25 42-50 2-15-46-11-78-7-15 1-34 10-42 16l-56 35 1-1-169-31c-14-3-24-5-37-1-10 5-18 10-27 18l122 72c4 3 5 7 1 9l-44 27-75-15c-10-2-18-4-28 0-8 4-14 9-20 15l74 63z"
                        fill="#222"
                        stroke-linejoin="round"
                        stroke-width="10"
                      />
                    </g>
                  </svg>
                </span>
                <span class="sfo sfoslip">
                  {booking.destination.substring(0, 3).toUpperCase()}
                </span>
                <div class="sub-content">
                  <span class="passenger_name">
                    PASSENGER NAME
                    <br />
                    <span>
                      {booking.checkin.passenger.firstName +
                        " " +
                        booking.checkin.passenger.lastName}
                    </span>
                  </span>
                  <span class="passenger_flight">
                    FLIGHT N&deg;
                    <br />
                    <span>{booking.flightNumber}</span>
                  </span>
                  <span class="passenger_gate">
                    GATE
                    <br />
                    <span>{booking.checkin.gateNumber}</span>
                  </span>
                  <span class="passenger_seat">
                    SEAT
                    <br />
                    <span>{booking.checkin.passenger.seatNumber}</span>
                  </span>
                  <span class="boardingtime">
                    BOARDING TIME
                    <br />
                    <span>{booking.departureTime}</span>
                  </span>

                  <span class="passenger_flight flightslip">
                    FLIGHT N&deg;
                    <br />
                    <span>{booking.flightNumber}</span>
                  </span>
                  <span class="passenger_seat seatslip">
                    SEAT
                    <br />
                    <span>{booking.checkin.passenger.seatNumber}</span>
                  </span>
                  <span class="passenger_name nameslip">
                    PASSENGER NAME
                    <br />
                    <span>
                      {booking.checkin.passenger.firstName +
                        " " +
                        booking.checkin.passenger.lastName}
                    </span>
                  </span>
                </div>
              </div>
              <div class="barcode"></div>
              <div class="barcode slip"></div>
            </div>
          </div>
          <div className="mt-5 d-flex justify-content-center gap-4">
            <Link to="/">
              <button className=" btn btn-secondary ">Home</button>
            </Link>
            <button
              className=" btn btn-secondary"
              onClick={() => {
                window.print();
              }}
            >
              Print
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SuccessCheckin;
