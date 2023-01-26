import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Slide } from "react-toastify";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

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
    }
  };

  const cancelReservation = (bookingId) => {
    confirmAlert({
      message: "Are you sure you want to cancel reservation?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleCancelBooking(bookingId),
        },
        {
          label: "No",
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
    });
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
              <div className="d-flex justify-content-between ">
                <h5 className="card-title">
                  {booking.origin} <span>{" -> "}</span>
                  {booking.destination}
                </h5>
                <h5>
                  {booking.departureTime} <span> {" -> "} </span>
                  {booking.arrivalTime}
                </h5>
              </div>
              <div className="d-flex justify-content-between ">
                <div className="d-flex gap-2">
                  <p className="card-text">Date:</p>
                  <p className="card-text">{booking.flightDate}</p>
                </div>
                <div>
                  <p className="card-text">{booking?.flightNumber}</p>
                </div>
              </div>
              <div className="d-flex gap-2">
                <p className="card-text">PNR:</p>
                <p className="card-text">{booking.pnrNumber}</p>
              </div>
              {booking.passengers.map((passenger, i) => {
                return (
                  <div
                    key={passenger.passengerId}
                    className="d-flex justify-content-between  "
                  >
                    <div className="d-flex gap-2">
                      <p className="card-text">Passenger:</p>
                      <p className="card-text">
                        {passenger.firstName + " " + passenger.lastName}
                      </p>
                    </div>
                    <p className="card-text">{passenger.emailAddress}</p>
                    <p className="card-text">{passenger.mobileNumber}</p>
                  </div>
                );
              })}
              <div className="d-flex justify-content-between align-items-center">
                <p className="card-text">
                  <small className="text-muted">{booking.bookingDate}</small>
                </p>
                <button
                  onClick={() => {
                    cancelReservation(booking.bookingId);
                  }}
                  className={`btn btn-primary ${loading && "disabled"}`}
                >
                  Cancel Reservation
                </button>
              </div>
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
