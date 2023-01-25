import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LOG_OUT } from "../store/auth/authSlice";
import { Link } from "react-router-dom";

function Navbar() {
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(user);
  }, []);

  const handleClick = () => {
    dispatch(LOG_OUT());
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand text-light">
          Brownfield Airlines
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link text-light" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/booking" className="nav-link text-light">
                Flights
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light">Checkin</a>
            </li>
          </ul>
          <div className="d-flex justify-content-between align-items-center gap-2">
            <div className="text-light text-decoration-none">
              {user ? user.emailAddress : "Guest"}
            </div>
            {user ? (
              <span
                role="button"
                onClick={handleClick}
                className="text-light text-decoration-none"
              >
                Logout
              </span>
            ) : (
              <Link to="/login" className="text-light text-decoration-none">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
