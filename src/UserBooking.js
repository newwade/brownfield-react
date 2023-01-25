import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function UserBooking() {
  const { data: user, loggedIn } = useSelector((state) => state.user);
  const [bookingData, setBookingData] = useState([]);
  const navigate = useNavigate();

  const fetchUserBookingData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/v1/book/user/${user.id}`
      );
      let bookings = await response.json();
      if (response.ok) {
        setBookingData(bookings);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(bookingData);

  useEffect(() => {
    fetchUserBookingData();
  }, []);

  useEffect(() => {
    if (!loggedIn) {
      return navigate("/login");
    }
  });

  return (
    <div className="container ">
      {bookingData.length > 0
        ? bookingData.map((booking, i) => (
            <div class="card mt-3 border">
              <div class="card-body">
                <div className="d-flex justify-content-between">
                  <h5 class="card-title">
                    {booking.origin} <span>-></span>
                    {booking.destination}
                  </h5>
                  <h5>
                    {booking.departureTime} <span>-></span>
                    {booking.arrivalTime}
                  </h5>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <p className="card-text">Date: </p>
                    <p className="card-text">{booking.flightDate}</p>
                  </div>
                  <div>
                    <p className="card-text">{booking?.flightNumber}</p>
                  </div>
                </div>
                <div className="d-flex">
                  <p className="card-text">PNR: </p>
                  <p className="card-text">{booking.pnrNumber}</p>
                </div>
                {booking.passengers.map((passenger, i) => {
                  return (
                    <div className="d-flex justify-content-between">
                      <div className="d-flex">
                        <p className="card-text">Passenger : </p>
                        <p className="card-text">
                          {passenger.firstName + " " + passenger.lastName}
                        </p>
                      </div>
                      <p className="card-text">{passenger.emailAddress}</p>
                      <p className="card-text">{passenger.mobileNumber}</p>
                    </div>
                  );
                })}

                <p class="card-text">
                  <small class="text-muted">{booking.bookingDate}</small>
                </p>
              </div>
            </div>
          ))
        : ""}
    </div>
  );
}

export default UserBooking;
