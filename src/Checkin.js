import React, { useState } from "react";

function Checkin() {
  const [booking, setBooking] = useState();
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState("");

  const fetchBooking = async (e) => {
    e.preventDefault();
    try {
      const pnr = e.target.pnr.value;
      const response = await fetch(
        `http://localhost:8081/api/v1/book/pnr/${pnr}`
      );
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
    }
  };

  const handleCheckin = () => {
    console.log(booking);
  };

  return (
    <div className="container">
      <form
        className="d-flex justify-content-center mt-5"
        onSubmit={fetchBooking}
      >
        <div className="form-group d-flex gap-2">
          {/* <label for="origin" className="text-center">
                Enter PNR
              </label> */}
          <input
            type="text"
            id="pnr"
            className="form-control-sm"
            placeholder="Enter Your PNR Number"
            required
          />
          <button type="submit" className="btn btn-primary">
            Search Booking
          </button>
        </div>
        <br />
      </form>
      {booking && (
        <div className="card mt-3 border">
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
                type="button"
                className={`btn btn-primary ${loading && "disabled"} `}
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Continue Check-in
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-scrollable ">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title fs-5 text-center" id="staticBackdropLabel">
                Terms and Conditions
              </h4>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body text-secondary " id="conditions">
              <p className="">
                Checked baggage allowance is applicable only on Air India
                operated flights and not on Brown Field Airline Express or any
                other Code Share flights. Passenger travelling on Brown Field
                Airline domestic sector and connecting to Brown Field Airline
                International sector or vice versa on the same ticket, the Free
                Baggage Allowance of International sector will be applicable.
                Gold Member of Star Alliance would continue to be permitted an
                additional 20Kgs of baggage allowance in Economy ClassName
                Members of Premium Club and Flying Returns members would
                continue to be permitted additional baggage, as notified from
                time to time, over the same. Infants will be entitled to 1
                collapsible stroller/carrycot/infant car seat. The maximum
                weight permissible for a single piece of baggage is 32 kgs. This
                rule is applicable on the entire Brown Field Airline network.
                Passengers who are dependent on a wheelchair or other assistive
                devices and are travelling with such equipment would be entitled
                to an additional baggage allowance up to 15 kg free of charge
                subject to the limitations of the aircraft as per DGCA
                guidelines. Passengers can carry their personal wheelchairs
                (which are fully collapsible to be stored in the aircraft hold
                retrievable at the boarding gate) or other assistive devices as
                additional checked baggage up to 15 kg, free of charge.
              </p>
              <div className="text-center">
                <input
                  id="checkbox"
                  type="checkbox"
                  onClick={() => {
                    setConfirm(!confirm);
                  }}
                />
                <label for="checkbox">
                  I agree to these
                  <a href="#conditions">Terms and Conditions</a>.
                </label>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                id="btn_checkin"
                className={`btn btn-primary btn ${!confirm && "disabled"}`}
                onClick={handleCheckin}
              >
                Get Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkin;
