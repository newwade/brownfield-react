import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "./axios/axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Slide } from "react-toastify";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { LOG_OUT } from "./store/auth/authSlice";

function UserBooking() {
  const { data: token, loggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchUserBookingData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/v1/book/user`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
      if (response.status === 200) {
        setBookingData(response.data);
      }
    } catch (error) {
      console.log(error);
      let err_status = error.response.status;
      if (err_status === 403) {
        dispatch(LOG_OUT());
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await axios.delete(`/api/v1/book/cancel/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
      if (response.status === 200) {
        fetchUserBookingData();
      }
    } catch (error) {
      console.log(error);
      toast.warning(error.response.data.message, {
        transition: Slide,
      });
      let err_status = error.response.status;
      if (err_status === 403) {
        dispatch(LOG_OUT());
      }
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
    <div className="container">
      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={true}
        newestOnTop={true}
      />
      {bookingData.length > 0 ? (
        bookingData.map((booking, i) => (
          <div
            key={booking.bookingId}
            className="card mt-3 border overflow-auto"
          >
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
