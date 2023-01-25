import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Slide } from "react-toastify";

function UserBooking() {
  const { data: user, loggedIn } = useSelector((state) => state.user);
  const [bookingData, setBookingData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchUserBookingData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8081/api/v1/book/user/${user.id}`
      );
      let data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      if (response.ok) {
        setBookingData(data);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      setLoading(true);
      const settings = {
        method: "DELETE",
      };
      const response = await fetch(
        `http://localhost:8081/api/v1/book/cancel/${bookingId}`,
        settings
      );
      if (!response.ok) {
        throw new Error("Something went wrong. Please try again");
      }
      if (response.ok) {
        fetchUserBookingData();
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
      toast.warning(error.message, {
        transition: Slide,
      });
    } finally {
      setLoading(false);
    }
  };

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
      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={true}
        newestOnTop={true}
      />
      {bookingData.length > 0 ? (
        bookingData.map((booking, i) => (
          <div key={booking.bookingId} className="card mt-3 border">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h5 className="card-title">
                  {booking.origin} <span>{" -> "}</span>
                  {booking.destination}
                </h5>
                <h5>
                  {booking.departureTime} <span> {" -> "} </span>
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
                  <div
                    key={passenger.passengerId}
                    className="d-flex justify-content-between text-muted"
                  >
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

              <p className="card-text">
                <small className="text-muted">{booking.bookingDate}</small>
              </p>
              <button
                onClick={() => handleCancelBooking(booking.bookingId)}
                className={`btn btn-primary ${loading && "disabled"}`}
              >
                Cancel Reservation
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="vh-100 d-flex flex-column justify-content-center align-items-center ">
          <p className="text-center text-secondary">No Bookings Found</p>
        </div>
      )}
    </div>
  );
}

export default UserBooking;
